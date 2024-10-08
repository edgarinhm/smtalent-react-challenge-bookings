import { createPortal } from 'react-dom';

interface SpinnerProps {
  show: boolean;
  text?: string;
  size?: 'Small';
  overlay?: 'None' | 'Component' | 'Page';
}

const Spinner = (props: SpinnerProps): JSX.Element => {
  const { text = '', size = '', show, overlay = 'Page' } = props;

  const loadingSpinnerSizeStyle = {
    Small: 'm-0 relative',
  };

  const loadingSpinnerSize = size ? loadingSpinnerSizeStyle[size] : '';

  const overlayStyle = {
    Component: 'relative z-10 bg-black text-white',
    Page: 'fixed z-20 bg-black text-white',
    None: '',
  };

  const loadingOverlay = overlay !== 'None' ? overlayStyle[overlay] : '';

  const loadingText = {
    Small: 'text-lg pt-0 text-center',
  };

  console.log('overlayStyle[overlay]', overlay, overlayStyle[overlay]);

  const spinner = (
    <div
      className={`${loadingSpinnerSize} top-0 left-0 w-full h-full m-0 opacity-60  flex items-center justify-center flex-col ${loadingOverlay}`}
    >
      <div className="w-24 h-24 border-l-2 border-yellow-400 rounded-full animate-spin"></div>
      <div className={`${size ? loadingText[size] : ''}`}>
        {text.toUpperCase()}
      </div>
    </div>
  );

  if (show) {
    // NOTE: portal used for page level spinner so that it works inside components
    // using the transfrom css prop (like our modals)
    return overlay === 'Page'
      ? createPortal(
          spinner,
          document.getElementById('modal-root') ?? document.body
        )
      : spinner;
  }

  return <></>;
};

export default Spinner;
