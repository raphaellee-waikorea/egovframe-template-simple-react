import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavAbout() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>소상공인 건강검진</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.SHCARD_SUMMARY} className={({ isActive }) => (isActive ? "cur" : "")}>진단 요약</NavLink></li>
                    <li><NavLink to={URL.SHCARD_FULL_SCOPE} className={({ isActive }) => (isActive ? "cur" : "")}>종합 진단</NavLink></li>
                    <li><NavLink to={URL.SHCARD_DETAIL_VIEW} className={({ isActive }) => (isActive ? "cur" : "")}>상세 진단 내역</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavAbout;