import Banner from "./Banner";
import CoveredAreas from "./CoveredAreas";
import CustomerCoupon from "./CustomerCoupon";
import CustomerReview from "./CustomerReview";
import ServiceProvide from "./ServiceProvide";

export default function Home(){
    return(
        <div className="space-y-10 my-10 max-w-[1400px] mx-auto">
            <Banner/>
            <ServiceProvide/>
            <CoveredAreas/>
            <CustomerReview/>
            <CustomerCoupon/>
        </div>
    )
}