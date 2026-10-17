import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Calendar, DatePicker, DateRangePicker, type DateRange } from "./DatePicker";
import { Field } from "../Input/Input";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    weekStartsOn: { control: "select", options: [0, 1] },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <DatePicker {...args} />
    </div>
  ),
};

export const WithField: Story = {
  render: () => (
    <div className="w-72">
      <Field label="Kickoff date" htmlFor="kickoff" hint="Weekdays only, from today">
        <DatePicker
          id="kickoff"
          minDate={new Date()}
          isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6}
          weekStartsOn={1}
        />
      </Field>
    </div>
  ),
};

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

function RangeDemo() {
  const [range, setRange] = useState<DateRange>({ from: daysAgo(6), to: new Date() });
  return (
    <div className="w-80">
      <Field label="Reporting period" htmlFor="period">
        <DateRangePicker
          id="period"
          value={range}
          onValueChange={setRange}
          maxDate={new Date()}
          presets={[
            { label: "Today", range: () => ({ from: new Date(), to: new Date() }) },
            { label: "Last 7 days", range: () => ({ from: daysAgo(6), to: new Date() }) },
            { label: "Last 30 days", range: () => ({ from: daysAgo(29), to: new Date() }) },
            { label: "Last 90 days", range: () => ({ from: daysAgo(89), to: new Date() }) },
          ]}
        />
      </Field>
    </div>
  );
}

export const Range: Story = {
  render: () => <RangeDemo />,
};

function InlineCalendarDemo() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div className="border-2 border-neo-black rounded-md shadow-brutal-md overflow-hidden">
      <Calendar selected={date} onSelect={setDate} />
    </div>
  );
}

export const InlineCalendar: Story = {
  render: () => <InlineCalendarDemo />,
};
