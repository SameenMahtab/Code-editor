import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import {useEffect, useState} from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

useEffect(() => {
    let timer: any;
    const listener = () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth);
            if(window.innerWidth * 0.75 < width){
                setWidth(window.innerWidth * 0.75);
            }
        }, 100);
    };
    window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        };
}, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 10],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
