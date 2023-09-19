import React from 'react';
import './style.css'

export default function Loader({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  console.log(hasMounted)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 10 second!')
      setHasMounted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // const [startTime, setStartTime] = React.useState(new Date().getTime());
  // React.useEffect(() => {
  //   if (!hasMounted) {
  //     // Start the timer when isStateTrue is false
  //     const timer = setInterval(() => {
  //       const currentTime = new Date().getTime();
  //       setStartTime(currentTime);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [hasMounted]);
  // console.log(startTime)
  if (!hasMounted) {
    return (
      <div className='container--loader'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
    )
  }
  return (
    <div {...delegated}>
      {children}
    </div>
  )
}
