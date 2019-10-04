import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Charts.css';
import PgnListStore from '../../store/pgnListStore';

export default class Charts extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      leftBtn: true,
      rightBtn: false,
      shift: 0,
      limit: 200,
      data : null,
      unit : ''
    };

    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
  }

  componentWillMount() {
      this.renderMyData();
  }

  shiftLeft(){
    this.setState((prevState, props) => {
      let offset = prevState.shift + 10;
      return {shift : offset, 
        rightBtn : offset!==0, 
        leftBtn : offset+prevState.limit<props.count};
    });
    this.renderMyData();
  }

  shiftRight(){
    this.setState((prevState, props) => { 
      let offset = (prevState.shift>10)?  prevState.shift-10: 0;
      return { shift : offset,  
        rightBtn : offset!==0,
        leftBtn : offset+prevState.limit<props.count
      };
    });
    this.renderMyData();
  }

  renderMyData(){
      let pgnName = this.props.pgn || '';
      let url = new URL('/api/loadpgn',window.location.protocol + "//" + window.location.host);
      let param = {pgn: pgnName, offset: this.state.shift, limit: this.state.limit};
      url.search = new URLSearchParams(param);
      fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ data : responseJson, unit: responseJson[0].pgnUnit });
          })
          .catch((error) => {
            console.error(error);
          });
  }

  render() {
    return (
    /* jshint ignore:start */
    <div className='box box-info'>
      <div className='box-header ui-sortable-handle'>
        <i className="fa fa-car"></i>
        <h3 className="box-title">{this.props.pgn}</h3>
        <div className="pull-right box-tools">
          <button onClick={this.shiftLeft} 
            className="btn btn-info btn-sm btn-arrow" 
            title="" 
            data-original-title="Left" 
            disabled={!this.state.leftBtn} >
            <i className="fa fa-angle-left"></i>
          </button>
          <button onClick={this.shiftRight} 
            className="btn btn-info btn-sm btn-arrow" 
            title="" 
            data-original-title="Right"
            disabled={!this.state.rightBtn}>
            <i className="fa fa-angle-right"></i>
          </button>
          <button onClick={()=>{PgnListStore.checkList(this.props.pgn);}} className="btn btn-info btn-sm" title="" data-original-title="Remove">
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div className='charts-container'>
          <ResponsiveContainer>
              <LineChart
                  data={this.state.data}
                  margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                  }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{value:this.state.unit,  dx: -20}} />
                  <Tooltip />
                  <Legend />
                  <Line name={this.props.pgn} type="monotone" dataKey="pgnData" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
}
