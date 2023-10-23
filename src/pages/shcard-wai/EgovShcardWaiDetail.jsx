import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSHCardWAI';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const options_line = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
        },
    },
};

export const options_hbar = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: false,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data_line = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const data_hbar = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


function EgovShcardWaiDetail() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li><Link to={URL.SHCARD}>소상공인 건강검진</Link></li>
                        <li>진단 상세</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_SHCARD" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">진단 상세</h1>

                        <p className="txt_1">상호별 상세정보와 매출 정보에 대해 표시합니디.</p>

                        <h2 className="tit_5">도심권 상세 데이터</h2>
                        <br />

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD007">
                            <div className="head">
                                <span>번호</span>
                                <span>소프트웨어명</span>
                                <span>다운</span>
                                <span>크기</span>
                                <span>등록일</span>
                            </div>
                            <div className="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                {/* <p className="no_data" key="0">검색된 결과가 없습니다.</p> */}

                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to={URL.SUPPORT_DOWNLOAD_DETAIL} className="list_item">
                                    <div>3</div>
                                    <div className="al">전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037</div>
                                    <div>100</div>
                                    <div>16Mb</div>
                                    <div>2021-7-24</div>
                                </Link>
                                <Link to={URL.SUPPORT_DOWNLOAD_DETAIL} className="list_item">
                                    <div>2</div>
                                    <div className="al">전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037</div>
                                    <div>100</div>
                                    <div>16Mb</div>
                                    <div>2021-7-24</div>
                                </Link>
                                <Link to={URL.SUPPORT_DOWNLOAD_DETAIL} className="list_item">
                                    <div>1</div>
                                    <div className="al">전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037</div>
                                    <div>100</div>
                                    <div>16Mb</div>
                                    <div>2021-7-24</div>
                                </Link>
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <div className="paging">
                                <ul>
                                    <li className="btn"><button to="#" className="first">처음</button></li>
                                    <li className="btn"><button to="#" className="prev">이전</button></li>
                                    <li><button to="#" className="cur">1</button></li>
                                    <li><button to="#">2</button></li>
                                    <li><button to="#">3</button></li>
                                    <li><button to="#">4</button></li>
                                    <li><button to="#">5</button></li>
                                    <li className="btn"><button to="#" className="next">다음</button></li>
                                    <li className="btn"><button to="#" className="last">마지막</button></li>
                                </ul>
                            </div>
                            {/* <!--/ Paging --> */}
                        </div>

                        <div className="smap">
                            <div className="left_col">
                                <h3>도심권 TOP5 업종별 매출 평균</h3>
                                <dl><Bar options={options_hbar} data={data_hbar} /></dl>
                            </div>
                            <div className='blank_col' />
                            <div className="left_col">
                                <h3>월별 전체 및 도심권 매출 평균</h3>
                                <dl><Line options={options_line} data={data_line} /></dl>
                            </div>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovShcardWaiDetail;