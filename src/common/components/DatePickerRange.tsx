import { CalendarDaysIcon } from '@heroicons/react/24/outline';
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
      icon={<CalendarDaysIcon cursor={'pointer'} className=" text-gray-600" />}
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      {...config}
    />
  );
};

export default DatePickerRange;
