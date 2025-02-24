import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thể thao 247</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="container">
          <div className="top-header relative p-10-0">
            <div className="d-flex">
              <div className="logo relative">
                <Link href="/" title="Thể thao 247">
                  <Image
                    src="https://thethao247.vn/frontend/images/logo2022.svg"
                    alt="Thể thao 247"
                    width={282}
                    height={73}
                  />
                </Link>
              </div>
              <div className="logo-event"></div>
            </div>
            <div className="logo-mobile" style={{ height: "30px" }}></div>
            <div
              className="submenu_social relative"
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
              }}
            >
              <ul className="submenu" style={{ borderRight: 0 }}>
                <li>
                  <Link href="/bao-gia.html" title="Quảng cáo" rel="nofollow">
                    <i className="icon-ads"></i>
                    Quảng cáo
                  </Link>
                </li>
              </ul>
              <div className="login-box"></div>
            </div>
          </div>
        </div>
        <nav className="navigation">
          <div className="main_nav is_desktop">
            <div className="container">
              <ul className="nav_content">
                <li>
                  <Link
                    href="/"
                    title="Trang chủ Thể Thao 247"
                    className="home-icon"
                  >
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/lich-thi-dau-bong-da/" title="Lịch thi đấu">
                    #Lịch thi đấu
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/bong-da-viet-nam-c1/"
                    title="Bóng đá Việt Nam"
                  >
                    #Bóng đá Việt Nam
                  </Link>
                  <div className="cate-child bg-2">
                    <div className="container">
                      <nav>
                        <Link
                          href="https://thethao247.vn/v-league-c15/"
                          title="V-League"
                        >
                          #V-League
                        </Link>
                        <Link
                          href="https://thethao247.vn/tuyen-quoc-gia-vn-c19/"
                          title="Đội tuyển Quốc gia"
                        >
                          #Đội tuyển Quốc gia
                        </Link>
                        <Link
                          href="https://thethao247.vn/bong-da-nu-viet-nam-c20/"
                          title="Bóng Đá Nữ"
                        >
                          #Bóng Đá Nữ
                        </Link>
                        <Link
                          href="https://thethao247.vn/u23-asian-cup"
                          title="U23 Châu Á"
                        >
                          #U23 Châu Á
                        </Link>
                        <Link
                          href="https://thethao247.vn/bong-da-tre-c329/"
                          title="Bóng đá trẻ"
                        >
                          #Bóng đá trẻ
                        </Link>
                        <Link
                          href="https://thethao247.vn/u20-chau-a-c321/"
                          title="U20 Châu Á"
                        >
                          #U20 Châu Á
                        </Link>
                        <Link
                          href="https://thethao247.vn/aff-cup"
                          title="AFF CUP"
                        >
                          #AFF CUP
                        </Link>
                      </nav>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/bong-da-anh-c8/"
                    title="Ngoại hạng Anh"
                  >
                    #Ngoại hạng Anh
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/bong-da-quoc-te-c2/"
                    title="Bóng đá quốc tế"
                  >
                    #Bóng đá quốc tế
                  </Link>
                  <div className="cate-child bg-4">
                    <div className="container">
                      <nav>
                        <Link
                          href="https://thethao247.vn/ngoai-hang-anh-c8/"
                          title="Ngoại hạng Anh"
                        >
                          #Ngoại hạng Anh
                        </Link>
                        <Link
                          href="https://thethao247.vn/uefa-nations-league-c323/"
                          title="UEFA Nations League"
                        >
                          #UEFA Nations League
                        </Link>
                        <Link
                          href="https://thethao247.vn/cup-c2-europa-league-c75/"
                          title="Cúp C2 Europa League"
                        >
                          #Cúp C2 Europa League
                        </Link>
                        <Link
                          href="https://thethao247.vn/bong-da-tay-ban-nha-la-liga-c9/"
                          title="Bóng đá Tây Ban Nha - La Liga"
                        >
                          #Bóng đá Tây Ban Nha - La Liga
                        </Link>
                        <Link
                          href="https://thethao247.vn/bong-da-y-serie-a-c10/"
                          title="Bóng đá Ý - Serie A"
                        >
                          #Bóng đá Ý - Serie A
                        </Link>
                        <Link
                          href="https://thethao247.vn/bong-da-duc-c11/"
                          title="Bóng đá Đức"
                        >
                          #Bóng đá Đức
                        </Link>
                        <Link
                          href="https://thethao247.vn/ligue-1-c12/"
                          title="Ligue 1"
                        >
                          #Ligue 1
                        </Link>
                      </nav>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/nhan-dinh-bong-da-c288/"
                    title="Nhận định"
                  >
                    #Nhận định
                  </Link>
                </li>
                <li>
                  <Link href="https://thethao247.vn/cup-c1-c13/" title="Cúp C1">
                    #Cúp C1
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/chuyen-nhuong-c14/"
                    title="Chuyển nhượng"
                  >
                    #Chuyển nhượng
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/the-thao-tong-hop-c5/"
                    title="Thể Thao"
                  >
                    #Thể Thao
                  </Link>
                  <div className="cate-child bg-0">
                    <div className="container">
                      <nav>
                        <Link
                          href="https://thethao247.vn/pickleball-c342/"
                          title="Pickleball"
                        >
                          #Pickleball
                        </Link>
                        <Link
                          href="https://thethao247.vn/yoga-c340/"
                          title="Yoga"
                        >
                          #Yoga
                        </Link>
                        <Link
                          href="https://thethao247.vn/bong-chuyen-c45/"
                          title="Bóng chuyền"
                        >
                          #Bóng chuyền
                        </Link>
                        <Link
                          href="https://thethao247.vn/quan-vot-tennis-c4/"
                          title="Tennis - Quần vợt"
                        >
                          #Tennis - Quần vợt
                        </Link>
                        <Link
                          href="https://thethao247.vn/bong-ro-c43/"
                          title="Bóng rổ"
                        >
                          #Bóng rổ
                        </Link>
                        <Link
                          href="https://thethao247.vn/vo-thuat-c228/"
                          title="Võ thuật"
                        >
                          #Võ thuật
                        </Link>
                        <Link
                          href="https://thethao247.vn/the-gioi-phui-c192/"
                          title="Thế giới Phủi"
                        >
                          #Thế giới Phủi
                        </Link>
                      </nav>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/esports-c180/"
                    title="Esports"
                  >
                    #Esports
                  </Link>
                  <div className="cate-child bg-1">
                    <div className="container">
                      <nav>
                        <Link
                          href="https://thethao247.vn/lmht-c181/"
                          title="LMHT"
                        >
                          #LMHT
                        </Link>
                        <Link
                          href="https://thethao247.vn/dau-truong-chan-ly-c303/"
                          title="Đấu Trường Chân Lý"
                        >
                          #Đấu Trường Chân Lý
                        </Link>
                        <Link
                          href="https://thethao247.vn/lmht-toc-chien-c289/"
                          title="LMHT Tốc Chiến"
                        >
                          #LMHT Tốc Chiến
                        </Link>
                        <Link
                          href="https://thethao247.vn/valorant-c305/"
                          title="Valorant"
                        >
                          #Valorant
                        </Link>
                        <Link
                          href="https://thethao247.vn/genshin-impact-c306/"
                          title="Genshin Impact"
                        >
                          #Genshin Impact
                        </Link>
                        <Link
                          href="https://thethao247.vn/cosplay-c307/"
                          title="Cosplay"
                        >
                          #Cosplay
                        </Link>
                        <Link
                          href="https://thethao247.vn/pubg-c236/"
                          title="PUBG"
                        >
                          #PUBG
                        </Link>
                      </nav>
                    </div>
                  </div>
                </li>
                <li>
                  <Link href="https://thethao247.vn/xe-c191/" title="Xe">
                    #Xe
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://thethao247.vn/can-biet-c123/"
                    title="Xu hướng"
                  >
                    #Xu hướng
                  </Link>
                </li>
              </ul>
              <div className="topsearch">
                <a href="#" className="btn_search">
                  <i className="icon-search far fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="container bg-white p-15">
          <h1 style={{ display: "none" }}>
            THỂ THAO 247 - Đọc báo bóng đá, tin thể thao 24h
          </h1>
          <div className="box-pick pb-15">
            <div className="w140 is_desktop"></div>
            <Image
              src="https://cdn-img.thethao247.vn/storage/files/hoangtung/2025/02/24/neymar-santos-67bbd5343af1c.jpg"
              width={610}
              height={340}
              alt="Neymar lập siêu phẩm phạt góc, 'gánh' Santos thắng đậm"
            />
            <span>lịch thi đấu bóng đá</span>
            <span>Bóng đá Việt Nam</span>
          </div>
        </div>
      </main>
    </div>
  );
}
