import { FC } from 'react';

interface Props {
  onChange: () => void;
}

const Slider: FC<Props> = ({ onChange }): JSX.Element => {
  return <input onChange={onChange} type="range" min="0" max="100" className="range range-primary" />;
};

export default Slider;
