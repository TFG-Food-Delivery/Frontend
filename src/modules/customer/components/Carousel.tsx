import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./styles.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function CarouselPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`}>
            <ArrowBackIos color="info" />
        </div>
    );
}

function CarouselNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className}`}>
            <ArrowForwardIos color="info" />
        </div>
    );
}

export const Carousel = () => {
    const bucketUrl = "https://ftd-bucket.s3.eu-north-1.amazonaws.com/img/carousel";
    const imageCount = 5; // Número de imágenes
    const images = Array.from({ length: imageCount }, (_, index) => `${bucketUrl}/carousel${index + 1}.jpg`);

    const settings = {
        className: "center",
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CarouselNextArrow />,
        prevArrow: <CarouselPrevArrow />,
        autoplaySpeed: 5000,
        autoplay: true,
        fade: true,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`carousel-${index + 1}`} />
                ))}
            </Slider>
        </div>
    );
};
