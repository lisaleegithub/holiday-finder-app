import React from 'react'

const images = [
    "https://cdn.pixabay.com/photo/2021/07/30/20/23/paris-6510643_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/05/13/14/15/cappadocia-765498_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/05/12/18/29/city-5164368_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/14/03/38/phra-nakhon-si-ayutthaya-1822502_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/04/20/11/30/korea-4141530_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/09/14/04/46/nine-5569969_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/12/25/02/59/blue-village-4717743_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/09/19/15/43/townscape-5584820_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/09/09/12/51/japan-3664500_1280.jpg"
];
const delay = 2500;

export default function Slideshow() {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="container">
            <div className="slideshow">
                <div
                    className="slideshowSlider"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                >
                    {images.map((image, index) => (
                        <div
                            className="slide"
                            key={index}>
                            <img src={image} alt="" style={{ width: "400px" }}></img>
                        </div>
                    ))}
                </div>

                <div className="slideshowDots">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`slideshowDot${index === idx ? " active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}


