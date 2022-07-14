import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { URL } from "../URL/url";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useTranslation } from 'react-i18next';
function Membership_card() {
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  let user_name = localStorage.getItem("user_name");
  let display_name = localStorage.getItem("display_name");
  let auth = localStorage.getItem("auth");
  let token = localStorage.getItem("token");
  let reseller_id = localStorage.getItem("reseller_id");
  let customerseq = localStorage.getItem("customerseq");
  let role = localStorage.getItem("role");
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [datal, setDatal] = useState([]);
  const [selectreseller, setSelectreseller] = useState('');
  const [selectcardnum, setSelectcardnum] = useState('');
  const [selectlocation, setSelectlocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [order, setorder] = useState("ASC");
  //let startDates = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
  //let endDates = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
  // date format  
  let years = startDate.getFullYear();
  let months = startDate.getMonth() + 1;
  let dts = startDate.getDate();
  if (dts < 10) {
    dts = '0' + dts;
  }
  if (months < 10) {
    months = '0' + months;
  }
  let startDates = years + '-' + months + '-' + dts;
  let yeare = endDate.getFullYear();
  let monthe = endDate.getMonth() + 1;
  let dte = endDate.getDate();
  if (dte < 10) {
    dte = '0' + dte;
  }
  if (monthe < 10) {
    monthe = '0' + monthe;
  }
  let endDates = yeare + '-' + monthe + '-' + dte;
  //console.log(years+'-' + months + '-'+dts);
  // date format

  const searchmfcard = () => {
    //e.preventDefault();
    //alert(startDates);
    //setSelectcustomer(e.target.value)
    //console.log(selectcustomer);
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'jairsjhkgasjhdgahjsfgdjhasdfhafsdjhajgsdhafsdjh',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios.post(URL + "/GetMFTransactionList", {
      reseller_id: reseller_id,
      cardnum: selectcardnum,
      fromdate: startDates,
      todate: endDates,

    }, headers).then((response) => {

      console.log(response.data.data)
      setData(response.data.data);



    })
  };

  useEffect(() => {




    //console.log(selectcustomer);
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'jairsjhkgasjhdgahjsfgdjhasdfhafsdjhajgsdhafsdjh',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    axios.post(URL + "/GetMFTransactionList", {
      // reseller_id: reseller_id,
      // cardnum: '',        
      // fromdate: startDates,
      // todate: endDates,
      reseller_id: 'eppay',
      cardnum: '',
      fromdate: '2021-07-01',
      todate: '2022-02-09',

    }, headers).then((response) => {
      //console.log(response.data.data)
      // alert('ram ji');
      setData(response.data.data);
      // $('#example').DataTable().destroy();
      // $('#example').DataTable();

    })

  }, []);

  //partner list
  const [datar, setDatar] = useState([]);
  const [datacus, setDatacus] = useState([]);
  const [datacusm, setDatacusm] = useState([]);

  useEffect(() => {

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    axios
      .post(URL + "/GetResellerList", { resellerid: '', }, headers)

      .then((response) => {

        setDatar(response.data.data);
        //console.log(response)


      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })

  }, []);

  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  //sorting
  const sorting = (col)=>{
    if(order==="ASC"){
      const sorted =[...data].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");

    }
    if(order==="DSC"){
      const sorted =[...data].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("ASC");

    }
  };

  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">


      <div className="container-fluid">
        <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('Details by period')}</h6>
            </nav>

          </div>
        </nav>

        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-2 px-4">
                <form action="" className="information_form">

                  <div className="row mt-3">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('Search period')}:</label>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        {/* <input type="date" name="data"  className="form-control" placeholder="dd/mm/yy"/> */}
                        <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <DatePicker className='form-control' selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="yyyy-MM-dd" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('Search')}</label>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <select className="classNameic form-select select_options align-left" onChange={(e) => { setSelectreseller(e.target.value) }} disabled="">
                          <option value="">{t('Partner')}</option>
                          {datar.map((item, i) => {
                            return <option key={i} value={item.resellerid}>{item.displayname}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <input type="text" name="" onChange={(e) => { setSelectcardnum(e.target.value) }} className="form-control" placeholder="" />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button type="button" className="btn btn-outline-success allBtnsize" onClick={searchmfcard}>{t('Search')}</button>
                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-4">
                <div className="databaseTableSection pt-0">
                  <div className="grayBgColor p-4 pt-2 pb-2">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('Sales information')}</h6>
                      </div>
                      <div className="col-md-6">
                        <div className="">

                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="top-space-search-reslute">
                    <div className="tab-content p-4 pt-0 pb-0">
                      <div className="tab-pane active" id="header" role="tabpanel">
                        <div>
                          <div id="datatable_wrapper" className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive">
                            <div className="d-flex exportPopupBtn">
                              {/* <a href="#!" className="btn button btn-info">Export</a> */}
                              <ReactHTMLTableToExcel
                                className="btn btn-info"
                                table="example"
                                filename="ReportExcel"
                                sheet="Sheet"
                                buttonText={t('Export')} />
                            </div>
                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr role="row">
                                  <th onClick={() => sorting("resellername")} className="text-center sorting_asc tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Partner')}</span></th>
                                  <th onClick={() => sorting("cardnum")} className="text-center sorting_asc tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span className="">{t('Card Number')}</span></th>
                                  <th onClick={() => sorting("description")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Card Description')}</span></th>
                                  <th onClick={() => sorting("topupcost")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Charge')}</span></th>
                                  <th onClick={() => sorting("usagecost")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Use')}</span></th>
                                  <th onClick={() => sorting("afterbal")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Balance')}</span></th>
                                  <th onClick={() => sorting("lastupdate")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span className="">{t('Charge/Use Date')}</span></th>
                                  <th className="text-center" colspan="9" rowspan="1">{t('Usage History')}</th>

                                </tr>
                                <tr role="row">
                                  <th onClick={() => sorting("paydate")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Print&amp;nbsp;Total: activate to sort column ascending">{t('Payment Date')}</th>

                                  <th onClick={() => sorting("customer")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Color: activate to sort column ascending">{t('customer')}</th>

                                  <th onClick={() => sorting("tid")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('TID')}</th>
                                  <th onClick={() => sorting("location")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('location')}</th>
                                  <th onClick={() => sorting("paycost")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('Amount of payment')}</th>
                                  <th onClick={() => sorting("jobtype")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('work type')}</th>
                                  <th onClick={() => sorting("papersize")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('size')}</th>
                                  <th onClick={() => sorting("colortype")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('color')}</th>
                                  <th onClick={() => sorting("totalpage")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('Long live')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.map((item, i) => {
                                  //console.log(item.resellername);
                                  return <tr key={i}>
                                    <td>{item.resellername}</td>
                                    <td>{item.cardnum}</td>
                                    <td>{item.description}</td>
                                    <td>{item.topupcost}</td>
                                    <td>{item.usagecost}</td>
                                    <td>{item.afterbal}</td>
                                    <td>{item.lastupdate}</td>
                                    <td>{item.paydate}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.tid}</td>
                                    <td>{item.location}</td>
                                    <td>{item.paycost}</td>
                                    <td>{item.jobtype}</td>
                                    <td>{item.papersize}</td>
                                    <td>{item.colortype}</td>
                                    <td>{item.totalpage}</td>

                                  </tr>
                                })}

                              </tbody>
                            </table>
                            <div>
                              <ul className="pageNumbers">
                                <li>
                                  <button
                                    onClick={handlePrevbtn}
                                    disabled={currentPage == pages[0] ? true : false}
                                  >
                                    {t('Prev')}
                                  </button>
                                </li>
                                {pageDecrementBtn}
                                {renderPageNumbers}
                                {pageIncrementBtn}

                                <li>
                                  <button
                                    onClick={handleNextbtn}
                                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                                  >
                                    {t('Next')}
                                  </button>
                                </li>
                              </ul>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>



      <footer className="card footer py-4">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-center">
                {t('Copyright')} © 2021 <i className="fa fa-heart"></i>
                <a href="#!" className="font-weight-bold" target="_blank">EP Pay</a> {t('All rights reserved')}.
              </div>
            </div>

          </div>
        </div>
      </footer>
    </main>

  );
}
export default Membership_card;