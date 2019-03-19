import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import Modal from "react-native-modal";
import CodeInput from 'react-native-code-input';
import CalendarPicker from 'react-native-calendar-picker';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:30, color:'blue'}}>Mironova Attendance</Text>
        <ClockStamps/>
      </View>
    );
  }
}

const employees = {
  '01': {
    name: 'Liam Trampota',
    attendance: [],
    id: '01',
    active: true,
    code: 1234
  },
  '02': {
    name: 'Alfredo Sugawara',
    attendance: [],
    id: '02',
    active: true,
    code:1234
  },
  '03': {
    name: 'Ted Grib',
    attendance: [],
    id: '03',
    active: true,
    code:1234,
  },
  '04': {
    name: 'Sheri Liebowitz',
    attendance: [],
    id: '04',
    active: true,
    code:1234
  },
  '05': {
    name: 'Rob Wagner',
    attendance: [],
    id: '05',
    active: true,
    code:1234
  },
  '06': {
    name: 'Billy M',
    attendance: [],
    id: '06',
    active: true,
    code:1234
  },
}

class Stamp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      in: false,
      name: props.employee.name,
      timeIn: null,
      id: props.employee.id,
      confirmation: false,
      confirmationType: 'in'
    }
  }

  clockOut(){
    let timeOut = new Date()
    let minutes = ((timeOut.getTime()/1000) - (this.state.timeIn.getTime()/1000))/60
    let hours = minutes/60
    let date = `${this.state.timeIn.getMonth()}-${this.state.timeIn.getDate()}`
    employees[this.state.id].attendance.push({timeIn:this.state.timeIn, timeOut:timeOut, minutes:minutes, date:date, hours:hours})
    this.setState({
      in:false,
      timeIn:null,
      in:false,
      confirmation: false,
    })
  }

  clockButton(){
    this.setState({
      confirmation:true
    })
  }

  clockIn(){

    this.setState({
      in:true,
      timeIn: new Date(),
      confirmation: false,
      confirmationType: 'out'
    })
  }

  checkCode(code){
    if(employees[this.state.id].code == code){
      if(this.state.in){
        this.clockOut()
      }else{
        this.clockIn()
      }
    } else {
      Alert.alert(
        'False Code',
        'Incorrect Code',
        [

          {text: 'Try Again', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  toggleConfirmation(){
    this.setState({
      confirmation:false
    })
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.in ?
          <View style={{alignItems:'center'}}>
          {this.state.timeIn.getUTCMinutes() < 10 ?
            <Text>
              Time In: {this.state.timeIn.toDateString()}, {this.state.timeIn.getUTCHours()}:0{this.state.timeIn.getUTCMinutes()}
            </Text>
            :
            <Text>
              Time In: {this.state.timeIn.toDateString()}, {this.state.timeIn.getUTCHours()}:{this.state.timeIn.getUTCMinutes()}
            </Text>
          }
            <TouchableOpacity
              onPress={()=>this.clockButton()}
              style=
                {{alignItems: 'center',
                  backgroundColor: 'red',
                  width: 150, paddingTop:10, paddingBottom:10, borderColor:'black', borderWidth:2, marginTop:5}}
              >
              <Text>clock out</Text>
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity
            onPress={()=>this.clockButton()}
            style=
              {{alignItems: 'center',
                backgroundColor: 'green',
                width: 150, paddingTop:10, paddingBottom:10, borderColor:'black', borderWidth:2, marginTop:5}}
            >
            <Text>clock in</Text>
          </TouchableOpacity>
        }

          <TouchableOpacity
            onPress={(id)=>this.props.showUser(this.state.id)}
            style=
              {{alignItems: 'center',
                backgroundColor: '#DDDDDD',
                width: 150, paddingTop:10, paddingBottom:10, borderColor:'black', borderWidth:2, marginTop:5}}
            >
            <Text>{this.state.name}</Text>
          </TouchableOpacity>

       <Modal
            isVisible={this.state.confirmation}
            backdropColor='white'
            backdropOpacity={1}
            >
            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
              <Text style={{fontSize:30}}>
                {this.state.name}
            </Text>
              {this.state.in ?
                <Text style={{fontSize:20}}>
                  Clock out
                  </Text>
                  :
                  <Text style={{fontSize:20}}>
                  Clock in
                  </Text>
              }
              <View style={{height:50}}>
                <CodeInput
                   ref="codeInputRef2"
                   keyboardType="numeric"
                   codeLength={4}
                   activeColor='blue'
                   inactiveColor='blue'
                   size={50}
                   borderType='border-circle'
                   autoFocus={false}
                   codeInputStyle={{ fontWeight: '800' }}
                   onFulfill={(code) => this.checkCode(code)}
                   borderType='square'
                  />
                </View>
                <View style={{marginTop:30}}>
                  <TouchableOpacity onPress={()=>this.toggleConfirmation()}>
                    <Text style={{fontSize:20, color:'red'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>

        </Modal>

      </View>
    );
  }
}

class ClockStamps extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showUser:false,
      userId: null,
      selectedStartDate: null,
      selectedEndDate: null,
    }
  }

  showUser(id){
    this.setState({
      showUser:true,
      userId:id
    })
  }

  hideUser(){
    this.setState({
      showUser:false,
      userId:null
    })
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
     this.setState({
       selectedEndDate: date,
     });
   } else {
     this.setState({
       selectedStartDate: date,
       selectedEndDate: null,
     });
   }
  }

  render(){
    let employeesArray =  Object.entries(employees)
    console.log(employeesArray)
    return (
      <View style = {{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        showUser: false,
        userId:null
      }}>
      {employeesArray.map((data) => {
        return(
            <Stamp employee={data[1]} showUser={(id)=>this.showUser(id)}/>
        )
      })}
      <Modal
        isVisible={this.state.showUser}
        >
        {this.state.userId ?
        <View style={{backgroundColor:'lightblue', flex:.8, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:50, textAlign:'center'}}>
            {employees[this.state.userId].name}
          </Text>
          <CalendarPicker
            onDateChange={(date, type)=>this.onDateChange(date, type)}
            allowRangeSelection={true}
            width={300}
            heigh={300}
            style={{backgroundColor:'white'}}
          />
          <TouchableOpacity>
            <Text>
              Calculate hours
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.hideUser()}>
            <Text style={{fontSize:40}}>X</Text>
          </TouchableOpacity>
         </View>
          :
          <View>
          </View>
        }
      </Modal>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
});
