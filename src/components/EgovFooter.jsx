import React from 'react';
import { Link } from 'react-router-dom';

function EgovFooter() {
    return (
        <div className="footer">
            <div className="inner">
                {/* <!--
                <h1>
                    <Link to="">
                        <img className="w" src="/assets/images/logo_footer_w.png" alt="" />
                        <img className="m" src="/assets/images/logo_footer_m.png" alt="" />
                    </Link>
                </h1>
                 --> */}
                <div className="info">
                    <p>
                        문의 메일 : davidjung@waikorea.com  <span className="m_hide">|</span><br className="m_show" />  문의 전화 : 02-6000-0524
                    </p>
                    <p className="copy">Copyright © 2022 WAI Co, Ltd. All Rights Reserved.</p>
                </div>
                <div className="right_col">
                    <Link to="http://www.waikorea.com" target='_blank'>
                        <img className="w" src="/assets/images/banner_wai_w_01.png" alt="" />
                        <img className="m" src="/assets/images/banner_wai_m_01.png" alt="" />
                    </Link>
                    <Link to="http://www.shinhancard.com" target='_blank'>
                        <img className="w" src="/assets/images/banner_wai_w_02.png" alt="" />
                        <img className="m" src="/assets/images/banner_wai_m_02.png" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EgovFooter;