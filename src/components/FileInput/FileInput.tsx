import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useCallback, useId, useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";

export const fileInputVariants = cva(
  [
    "relative flex flex-col items-center justify-center text-center w-full",
    "bg-neo-offwhite text-neo-black",
    "border-2 border-dashed border-neo-black rounded-md",
    "cursor-pointer transition-all duration-150",
    "hover:bg-neo-yellow-50",
    "focus-within:border-solid focus-within:shadow-brutal-pink focus-within:-translate-x-0.5 focus-within:-translate-y-0.5",
  ],
  {
    variants: {
      size: {
        sm: "px-4 py-5 gap-2",
        md: "px-6 py-8 gap-3",
        lg: "px-8 py-12 gap-4",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface FileRejection {
  file: File;
  reason: "type" | "size";
}

export interface FileInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "type" | "value" | "defaultValue" | "onChange"
    >,
    VariantProps<typeof fileInputVariants> {
  title?: string;
  description?: string;
  /** Max size per file, in bytes. */
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  onReject?: (rejections: FileRejection[]) => void;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Mirrors the native `accept` attribute, which drag-and-drop bypasses
function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith(".")) return name.endsWith(rule);
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
      return type === rule;
    });
}

// Keep the native input's FileList in sync so the field works in plain <form> submits
function syncNativeFiles(input: HTMLInputElement | null, files: File[]) {
  if (!input || typeof DataTransfer === "undefined") return;
  const transfer = new DataTransfer();
  files.forEach((file) => transfer.items.add(file));
  input.files = transfer.files;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      size,
      id,
      title = "Drop files here or click to browse",
      description,
      accept,
      multiple,
      maxSize,
      disabled,
      onFilesChange,
      onReject,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const commit = (next: File[]) => {
      setFiles(next);
      syncNativeFiles(inputRef.current, next);
      onFilesChange?.(next);
    };

    const addFiles = (incoming: File[]) => {
      const accepted: File[] = [];
      const rejections: FileRejection[] = [];

      incoming.forEach((file) => {
        if (!matchesAccept(file, accept)) rejections.push({ file, reason: "type" });
        else if (maxSize !== undefined && file.size > maxSize)
          rejections.push({ file, reason: "size" });
        else accepted.push(file);
      });

      if (rejections.length) onReject?.(rejections);
      if (!accepted.length) {
        syncNativeFiles(inputRef.current, files);
        return;
      }
      commit(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
    };

    const removeFile = (index: number) => {
      commit(files.filter((_, i) => i !== index));
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      addFiles(Array.from(event.dataTransfer.files));
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={(event) => {
            // Ignore leave events fired when moving between child elements
            if (!event.currentTarget.contains(event.relatedTarget as Node | null))
              setIsDragging(false);
          }}
          data-dragging={isDragging || undefined}
          className={cn(
            fileInputVariants({ size }),
            "data-[dragging]:border-solid data-[dragging]:bg-neo-yellow-100 data-[dragging]:shadow-brutal",
            "has-[input[aria-invalid=true]]:border-neo-red has-[input[aria-invalid=true]]:shadow-brutal-red",
            disabled &&
              "bg-neo-offwhite-200 cursor-not-allowed opacity-70 hover:bg-neo-offwhite-200",
            className
          )}
        >
          <input
            ref={setRefs}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="sr-only"
            onChange={(event) => addFiles(Array.from(event.target.files ?? []))}
            {...props}
          />
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-neo-black bg-neo-yellow shadow-brutal-sm">
            <Upload className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="font-display font-bold text-body text-neo-black">{title}</p>
            {description && (
              <p className="text-body-sm text-neo-black-500">{description}</p>
            )}
          </div>
        </label>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}-${index}`}
                className="flex items-center gap-3 px-3 py-2 bg-neo-offwhite border-2 border-neo-black rounded-md shadow-brutal-sm"
              >
                <FileText className="w-5 h-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-body-sm font-semibold truncate">{file.name}</p>
                  <p className="text-micro text-neo-black-500 font-mono">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  aria-label={`Remove ${file.name}`}
                  className={cn(
                    "flex items-center justify-center w-7 h-7 shrink-0",
                    "border-2 border-neo-black rounded-sm bg-neo-offwhite",
                    "transition-colors duration-150 hover:bg-neo-pink",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <X className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
FileInput.displayName = "FileInput";
