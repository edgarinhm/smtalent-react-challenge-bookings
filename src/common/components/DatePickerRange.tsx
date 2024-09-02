import { LuCalendarDays } from 'react-icons/lu';
import DatePicker from 'react-datepicker';
import { forwardRef, useRef } from 'react';
import { mergeRefs } from '../functions/merge-refs';
import { DateRangeInputProps } from '../models/form-control-model';

interface DatePickerRange {
  startDate?: Date;
  endDate?: Date;
  showIcon?: boolean;
  selectsRange?: boolean;
  toggleCalendarOnIconClick?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange: (update: [Date | null, Date | null]) => void;
}

const DatePickerRange = (props: DatePickerRange) => {
  const { startDate, endDate, onChange } = props;

  return (
    <DatePicker
      className="mt-0.5 mb-0.5 border-solid border border-transparent ml-4 focus:outline-none"
      wrapperClassName="min-w-full"
      icon={
        <LuCalendarDays
          cursor={'pointer'}
          className="text-gray-600 m-1  size-6"
        />
      }
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      showIcon
      selectsRange
      toggleCalendarOnIconClick
    />
  );
};

export const DatePickerSelectRangeInput = (props: DateRangeInputProps) => {
  const CustomDateInput = forwardRef(function CustomDateInput(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forwardedProps: any,
    inputRef
  ) {
    const dateRef = useRef<HTMLInputElement>(null);
    return (
      <button {...forwardedProps} ref={mergeRefs(dateRef, inputRef)}>
        <LuCalendarDays
          cursor={'pointer'}
          className="text-gray-600 mx-2  size-6"
        />
        <span>{forwardedProps.value}</span>
      </button>
    );
  });

  return (
    <DatePicker
      minDate={props?.minDate?.toDate()}
      maxDate={props?.maxDate?.toDate()}
      customInput={<CustomDateInput />}
      selected={props.startDate}
      onChange={props.onSelectRangeDate}
      startDate={props.startDate}
      endDate={props.endDate}
      selectsRange
      className="p-0.5 flex  items-center w-full border-solid border border-transparent  focus:outline-none"
      wrapperClassName="min-w-full"
    />
  );
};

export default DatePickerRange;
