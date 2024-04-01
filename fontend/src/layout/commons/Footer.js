import Image from 'react-bootstrap/Image';
import LogoSC from '../../assets/images/LogoSC.png';
import LogoFacebook from '../../assets/images/Logo-Facebook.png';
import LogoInstagram from '../../assets/images/Logo-Instagram.png';
import LogoTiktok from '../../assets/images/Logo-Tiktok.png';
import LogoYoutobe from '../../assets/images/Logo-Youtobe.png';
import LogoSell from '../../assets/images/Logo-Sell.png';

const Footer = () => {
    return (
        <div className='d-flex justify-content-between container py-5 '>
            <div className='logo '>
                <Image src={LogoSell}/>
                <div className='name-shop fs-3 fw-bold '>&nbsp;SellSmart Codes</div>
            </div>
            <div>
                <div className='fs-4 fw-bold '>
                    Về chúng tôi
                </div>
                <div>

                    Về chúng tôi <br/>
                    Điạ chỉ cửa hàng <br/>
                    Liên lạc <br/>
                    Theo dõi đơn hàng <br/>
                </div>
            </div>

            <div>
                <div className='fs-4 fw-bold '>
                    Liên kết hữu ích
                </div>
                <div>

                    Chính sách đổi trả <br/>
                    Chính sách hỗi trợ<br/>
                    Hướng dẫn chọn size <br/>
                    Câu hỏi thường gặp <br/>
                </div>
            </div>
            <div>
                <div className='fs-4 fw-bold me-5 '>
                    Mạng xã hội
                </div>
                <div>

                    <Image src={LogoFacebook}/>&nbsp;Facebook <br/>
                    <Image src={LogoTiktok}/>&nbsp;Tiktok<br/>
                    <Image src={LogoYoutobe}/>&nbsp;Youtube <br/>
                    <Image src={LogoInstagram}/>&nbsp;Instagram <br/>
                </div>
            </div>
        </div>
    )
}

export default Footer;