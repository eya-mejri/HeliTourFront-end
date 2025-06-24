import { Next } from "react-bootstrap/esm/PageItem";

export const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow custom-next"
        onClick={onClick}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          zIndex: 2,
          cursor: 'pointer',
          fontSize: '24px',
          transform: 'translateY(-50%)',
          color: '#000',
        }}
      >
        <i className="isax isax-arrow-right"></i>
      </div>
    );
  };
  
  export const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow custom-prev"
        onClick={onClick}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          zIndex: 2,
          cursor: 'pointer',
          fontSize: '24px',
          transform: 'translateY(-50%)',
          color: '#000',
        }}
      >
         <i className="isax isax-arrow-left"></i>

      </div>
    );
  };
