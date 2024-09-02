import { Dayjs } from 'dayjs';
import { TooltipPlacement } from '../types/tooltip';

export interface BaseControlProps {
  label?: string;
  showErrors?: boolean;
  errors?: string[];
  showWarnings?: boolean;
  warnings?: string[];
}

export interface AutoCompleteOptionProps {
  id: number;
  [key: string]: string | number;
}

export interface DateInputProps extends BaseControlProps {
  selectedDate?: Dayjs | null;
  minDate: Dayjs;
  maxDate?: Dayjs;
  id?: string;
  name?: string;
  disabled?: boolean;
  toolTip?: string;
  toolTipPlacement?: TooltipPlacement;
  onSelectDate: (date: string) => void;
  readOnly?: boolean;
  dataInvalid?: boolean;
  excludeDates?: Dayjs[];
  ariaLabelledBy?: string;
  onKeyPressEnter?: (date?: string) => void;
  disableIgnoreOutsideClickClass?: boolean;
}

export interface DateRangeInputProps
  extends Omit<DateInputProps, 'onSelectDate'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectRangeDate: (value: [any, any]) => void;
  startDate?: Date;
  endDate?: Date;
}
export interface DatePickerRef {
  setOpen: (value: boolean) => void;
  setFocus: () => void;
  isCalendarOpen: () => boolean;
}
