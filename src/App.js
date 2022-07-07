import "./App.scss";
import {useRef, useState} from "react";

const App = () => {
  // snapScrollItem을 담는 wrapper의 ref
  const snapScrollWrapperRef = useRef();
  const [images, setImages] = useState([
    {previewURL: "img/image1.jpg", type: "image"},
    {previewURL: "video/video1.mp4", type: "video"},
    {previewURL: "img/image2.jpg", type: "image"},
    {previewURL: "video/video2.mp4", type: "video"},
    {previewURL: "img/image3.png", type: "image"},
  ]);

  const playVideo = (e) => {
    // snap-scroll-wrapper의 뷰포트에서 맨 위 Y좌표와 맨 아래 Y좌표를 구함
    const snapScrollWrapperRect = e.target.getBoundingClientRect();
    const snapScrollWrapperTopY = snapScrollWrapperRect.top;
    const snapScrollWrapperBottomY = snapScrollWrapperRect.bottom;
    // 스크롤되는 아이템들은 snap-scoll-wrapper의 자식들(snap-scroll-item)이다.
    const snapScrollItems = e.target.childNodes;
    snapScrollItems.forEach((item) => {
      // 이미지나 비디오는 snap-scroll-item의 0번째 자식
      const snapScrollItem = item.childNodes[0];
      // 비디오일 때만 부모의 뷰포트 맨위와 맨 아래에 중심이 들어왔을 때 실행
      if (snapScrollItem.tagName === "VIDEO"){
        const snapScrollItemRect = item.childNodes[0].getBoundingClientRect();
        // snapScrollItem의 뷰포트에서 중앙 Y 좌표
        const snapScrollItemCenter = (snapScrollItemRect.top + snapScrollItemRect.bottom) / 2;
        if (snapScrollItemCenter > snapScrollWrapperTopY &&
          snapScrollItemCenter < snapScrollWrapperBottomY
        ) {
          snapScrollItem.play();
        }
        else{
          snapScrollItem.pause();
        }
      }
    })
  }
  return (
    <>
      <div className="header">
        THIS IS HEADER!!
      </div>
      <div className="snap-scroll-wrapper" ref={snapScrollWrapperRef} onScroll={playVideo}>
        {images.map((item, index) => (
          <div className="snap-scroll-item" key={index}>
            {item.type === "image" ? (
              <img src={item.previewURL}/>
            ) : (
              <video src={item.previewURL} controls={true} muted={true}/>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
export default App;