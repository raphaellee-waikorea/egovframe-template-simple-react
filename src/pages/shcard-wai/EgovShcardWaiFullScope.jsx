import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link, useLocation } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSHCardWAI';

import * as EgovNet from 'api/egovFetch';
import { NOTICE_BBS_ID } from 'config';
import EgovPaging from 'components/EgovPaging';
import { itemIdxByPage } from 'utils/calc';

function EgovShcardWaiFullScope() {
    const cndRef = useRef();
    const wrdRef = useRef();
    const location = useLocation();

    const bbsId = location.state?.bbsId || NOTICE_BBS_ID;
    const [paginationInfo, setPaginationInfo] = useState({});

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { bbsId: bbsId, pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback((searchCondition) => {
        console.groupCollapsed("EgovNoticeList.retrieveList()");

        const retrieveListURL = '/cop/bbs/selectBoardListAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setMasterBoard(resp.result.brdMstrVO);
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

                let mutListTag = [];
                mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                const resultCnt = parseInt(resp.result.resultCnt);
                const currentPageNo = resp.result.paginationInfo.currentPageNo;
                const pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    const listIdx = itemIdxByPage(resultCnt, currentPageNo, pageSize, index);

                    mutListTag.push(
                        <Link
                            to={{ pathname: URL.INFORM_NOTICE_DETAIL }}
                            state={{
                                nttId: item.nttId,
                                bbsId: item.bbsId,
                                searchCondition: searchCondition
                            }}
                            key={listIdx}
                            className="list_item" >
                            <div>{listIdx}</div>
                            {(item.replyLc * 1 ? true : false) &&
                                <div className="al reply">
                                    {item.nttSj}
                                </div>}
                            {(item.replyLc * 1 ? false : true) &&
                                <div className="al">
                                    {item.nttSj}
                                </div>}
                            <div>{item.frstRegisterNm}</div>
                            <div>{item.frstRegisterPnttm}</div>
                            <div>{item.inqireCo}</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovNoticeList.retrieveList()");
    }, []);

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to={URL.SHCARD}>소상공인 건강검진</Link></li>
                        <li>종합 진단</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_SHCARD" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">종합 진단</h1>

                        <div className="smap">
                            <div className="left_col">
                                <h3>검색 조건</h3>
                                <dl>
                                    <sh>검진 지역</sh>
                                    <sb>
                                        <label className="f_select_area_large" htmlFor="sel1">
                                            <select id="sel1" title="조건" defaultValue={searchCondition.searchCnd} ref={cndRef}
                                                onChange={e => {
                                                    cndRef.current.value = e.target.value;
                                                }}
                                            >
                                                <option value="0">서울시</option>
                                            </select>
                                        </label>
                                        <label className="f_select_area_small" htmlFor="sel1">
                                            <select id="sel1" title="조건" defaultValue={searchCondition.searchCnd} ref={cndRef}
                                                onChange={e => {
                                                    cndRef.current.value = e.target.value;
                                                }}
                                            >
                                                <option value="0">도심권 (종로구, 중구, 용산구)</option>
                                                <option value="1">종로구</option>
                                                <option value="2">중구</option>
                                                <option value="3">용산구</option>
                                            </select>
                                        </label>
                                    </sb>
                                </dl>
                                <dl>
                                    <sh_bottom>검진 일자</sh_bottom>
                                    <sb_bottom>&nbsp;2023년 08월 10일</sb_bottom>
                                </dl>
                            </div>
                        </div>

                        <h3 className="tit_5">종합 결과</h3>
                        <p className="msg_1">현재 전자정부는 유사한 기능을 가지는 다양한 종류 및 버전의 프레임워크를 개별 시스템 단위로 적용/관리하고
                            있으며, 이에 따라 다양한 문제점들이 발생하고 있다. 전자정부에 적용된 개발프레임워크는 Black Box 형태로
                            제공되어 사업자의 기술지원 없이는 응용 SW를 유지보수하기 어렵기 때문에 사업자에 대한 의존성이 발생한다.

                            복수개의 개발프레임워크가 적용된 사업의 경우, 프레임워크에 따라 개발표준 정의, 개발자수급, 교육시행 등
                            별도의 유지보수 체계를 갖추는 중복 투자가 발생하며, 개발프레임워크의 체계적인 관리절차의 미비로 동일
                            개발프레임워크라 하더라도 버전 관리에 어려움이 있다.전자정부의 프레임워크의 표준화는 사업자 고유 개발
                            프레임워크에 대한 기술 종속성을 배제하고 표준화를 통해 응용 SW의 표준화와 품질, 재사용성을 향상시키며,
                            개발 프레임워크의 유지 보수 단일화를 통한 투자 효율성을 높인다.</p>

                        <h3 className="tit_5">체격 (Physique)</h3>
                        <div className="sval">
                            <div className="left_col">
                                <dl>
                                    <sh_left>진단 항목</sh_left>
                                    <sh_body>항목 상세</sh_body>
                                    <sh_main_left></sh_main_left>
                                    <sh_body>내용</sh_body>
                                    <sh_main_last></sh_main_last>
                                </dl>
                                <dl><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head></dl>
                                <dl>
                                    <sb_left>매출</sb_left>
                                    <sb_left>매출액 평균</sb_left>
                                    <sb_body>
                                        <p className='sh_num'>22,463<small>(천만원)</small></p>최근 1개월
                                    </sb_body>
                                    <sb_body_center>
                                        <p className='sh_num'>19,238<small>(천만원)</small></p>전체 평균
                                    </sb_body_center>
                                    <sb_body>
                                        <p className='sh_num'>7위</p>전체 순위
                                    </sb_body>
                                </dl>
                                <dl><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot></dl>
                                <dl><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head></dl>
                                <dl>
                                    <sb_left>이용 건수</sb_left>
                                    <sb_left>이용 건수 평균</sb_left>
                                    <sb_body>
                                        <p className='sh_num'>347<small>(건)</small></p>최근 1개월
                                    </sb_body>
                                    <sb_body_center>
                                        <p className='sh_num'>205<small>(건)</small></p>전체 평균
                                    </sb_body_center>
                                    <sb_body>
                                        <p className='sh_num'>6위</p>전체 순위
                                    </sb_body>
                                </dl>
                                <dl><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot></dl>
                                <dl><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head><sb_body_none_head></sb_body_none_head></dl>
                                <dl>
                                    <sb_left>구매력</sb_left>
                                    <sb_left>지역내 이용객 소비 금액</sb_left>
                                    <sb_body>
                                        <p className='sh_num'>160<small>(천만원)</small></p>최근 1개월
                                    </sb_body>
                                    <sb_body_center>
                                        <p className='sh_num'>147<small>(천만원)</small></p>전체 평균
                                    </sb_body_center>
                                    <sb_body>
                                        <p className='sh_num'>7위</p>전체 순위
                                    </sb_body>
                                </dl>
                                <dl><sb_body_none_last_left></sb_body_none_last_left><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_foot></sb_body_none_foot><sb_body_none_last_last></sb_body_none_last_last></dl>
                            </div>
                        </div>

                        <h3 className="tit_5">체력 (Strength)</h3>
                        <div className="sval">
                            <div className="left_col">
                                <dl>
                                    <sh_left>진단 영역</sh_left>
                                    <sh_body>진단 항목</sh_body>
                                    <sh_main_left></sh_main_left>
                                    <sh_body>검사 결과</sh_body>
                                    <sh_main_last></sh_main_last>
                                </dl>
                                <dl>
                                    <sb_left></sb_left>
                                    <sb_left>매출 증감률</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>+0.6%<small>직전월 대비</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>-5%<small>직전 3개월 대비</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>+4.5%<small>직전 6개월 대비</small></p></sb_body>
                                </dl>
                                <dl>
                                    <sb_left>성장성</sb_left>
                                    <sb_left>전분기 대비 점포수 증감률</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>+0.6%<small>직전월 대비</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>-5%<small>직전 3개월 대비</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>+4.5%<small>직전 6개월 대비</small></p></sb_body>
                                </dl>
                                <dl>
                                    <sb_left></sb_left>
                                    <sb_left>객단가 증감 추이</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>+0.6%<small>직전월 대비</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>-5%<small>직전 3개월 대비</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>+4.5%<small>직전 6개월 대비</small></p></sb_body>
                                </dl>
                                <dl><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_foot/></dl>
                                <dl>
                                    <sb_left></sb_left>
                                    <sb_left>평균 업력</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>8년<small>평균입력</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>음식<small>최대업력업종</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>4위<small>전체 순위</small></p></sb_body>
                                </dl>
                                <dl>
                                    <sb_left>안정성</sb_left>
                                    <sb_left>휴폐업률</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>+6.17%<small>직전월 대비</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>+8.82%<small>전분기 대비</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>7위<small>전체 순위</small></p></sb_body>
                                </dl>
                                <dl>
                                    <sb_left></sb_left>
                                    <sb_left>변동성<br/>(매출 편차, 이탈 점포 수)</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>1.2</p></sb_body_sth_left>
                                    <sb_body_sth>
                                        <p className='sh_upper_sth'>변동성</p>
                                        <ProgressBar now={60} variant="warning" />
                                    </sb_body_sth>
                                </dl>
                                <dl><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_foot/></dl>
                                <dl>
                                    <sb_left></sb_left>
                                    <sb_left>신용등급</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>4.6<small>평균</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>+0.128<small>전월 대비 당월</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>4.592<small>당월 전체</small></p></sb_body>
                                </dl>
                                <dl>
                                    <sb_left>건전성</sb_left>
                                    <sb_left>연체율</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>+0.17%<small>최근 1개월</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>+5.42%<small>전체 평균</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>7위<small>전체 순위</small></p></sb_body>
                                </dl>
                                <dl>
                                    <sb_left></sb_left>
                                    <sb_left>한계이업 비율<br/>(DSR 50% 초과)</sb_left>
                                    <sb_body_sth_left><p className='sh_num_sth'>+3.49%<small>직전월 대비</small></p></sb_body_sth_left>
                                    <sb_body><p className='sh_num_sth'>+2.12%<small>전분기 대비</small></p></sb_body>
                                    <sb_body><p className='sh_num_sth'>5위<small>전체 순위</small></p></sb_body>
                                </dl>
                                <dl><sb_sth_none_last_left/><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_foot/><sb_sth_none_last_last/></dl>
                            </div>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovShcardWaiFullScope;