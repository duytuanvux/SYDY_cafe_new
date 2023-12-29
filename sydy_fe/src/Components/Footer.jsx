import FacebookFilled from "@ant-design/icons/lib/icons/FacebookFilled";
import InstagramFilled from "@ant-design/icons/lib/icons/InstagramFilled";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-base-grey text-base-cream flex justify-center items-center py-5">
      <div className="basis-1/4 flex justify-center">
        <Link to="">
          <img className="w-40" src="/assets/img/logo_circle.png" alt="" />
        </Link>
      </div>
      <div className="basis-2/4 flex flex-col gap-4">
        <div>
          <p>Follow us & keep updated!</p>
          <div className="flex gap-2">
            <Link to="https://www.facebook.com/sydycafe" target="_blank">
              <FacebookFilled style={{ fontSize: "150%" }} />
            </Link>
            <Link to="*">
              <InstagramFilled style={{ fontSize: "150%" }} />
            </Link>
          </div>
        </div>
        <div>
          <p>Luôn sẵn sàng hỗ trợ</p>
          <span>
            Hotline: <Link to="tel:+84961602028">096.160.2028</Link>{" "}
          </span>
        </div>
        <div>
          <p>Địa chỉ:</p>
          <span>
            85 Đường 13, KĐT Vạn Phúc, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam
          </span>
        </div>
      </div>
      <div className="basis-1/4 m-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.587349208161!2d106.70655137346733!3d10.842857657968079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529e4a94fa0e9%3A0x3cbf58e2f50d8c0d!2sSYDY%20Cafe!5e0!3m2!1sen!2s!4v1685523564731!5m2!1sen!2s"
          width="300"
          height="200"
          style={{ border: 5 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
}

export default Footer;
