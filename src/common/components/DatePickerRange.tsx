import { LuCalendarDays } from 'react-icons/lu';

import DatePicker from 'react-datepicker';

interface DatePickerRange {
  startDate?: Date;
  endDate?: Date;
  showIcon?: boolean;
  selectsRange?: boolean;
  toggleCalendarOnIconClick?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (update: any) => void;
}

const DatePickerRange = (props: DatePickerRange) => {
  const {
    showIcon = true,
    startDate,
    endDate,
    selectsRange = false,
    onChange,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = {};
  config.showIcon = showIcon;
  if (selectsRange) {
    config.selectsRange = true;
  }

  if (showIcon) {
    config.toggleCalendarOnIconClick = true;
  }

  return (
    <DatePicker
      {...props}
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
      {...config}
    />
  );
};

export default DatePickerRange;
