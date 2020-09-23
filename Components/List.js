import React,{Component} from "react";
import { View, Text ,StyleSheet,StatusBar,FlatList,Image,Dimensions,TouchableOpacity,} from "react-native";
import { MaterialIcons, MaterialCommunityIcons,Octicons,Ionicons,AntDesign,Entypo } from '@expo/vector-icons'
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import {data} from '../assets/data'
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export default class List extends Component{
  static navigationOptions = {
   headerTitle:"none",
   headerTitleStyle: { alignSelf: 'center',backgroundColor:"transparent",opacity:0 },
    headerTransparent: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
    headerLeft: (
      <View style={{paddingLeft:20}}>
      <Ionicons name="md-arrow-back" size={30} color="white" />
      </View>
    ),
    headerRight: (
      <View style={{flexDirection:"row",padding:10}}>
        <Entypo name="share-alternative" size={24} style={{marginRight:10}} color="white" />
      <Ionicons name="md-information-circle" size={30} color="white" />
      </View>
    )
  };
  constructor(props){
    super(props)
    this.state={
      data:[],addedItems:0,ItemsDetails:[],TotalPrice:0
    }
   
  }
  componentDidMount(){
    this.setState({data:data})
  }
  addItem=(item,index)=>{
    let {data}=this.state
     console.log(item + index)
   if(item.itemsAdded <10 ){
     data[index].itemsAdded=item.itemsAdded+1
     
     this.setState({addedItems:this.state.addedItems+1})
   console.log(data[index].itemsAdded * data[index].price)


      let add=[]
      // console.log(this.state.ItemsDetails.length+"length")
      if(this.state.ItemsDetails.length==0){
        this.state.ItemsDetails.push(item)
      }else{
        for(let i=0;i<this.state.ItemsDetails.length;i++){
          if(this.state.ItemsDetails[i].id!=item.id){
            this.state.ItemsDetails.push(item)
          }
        }
      }
    
   }
     this.setState({data:data})
     
  }
  viewCart=()=>{
let price=0
    let arr=[]
   let filter= this.state.data.filter((item)=>{
      return item.itemsAdded!=0
    })
  for(let i=0;i<filter.length;i++){

   price = price + filter[i].price*filter[i].itemsAdded
  }
    
    console.log(price+"price")
    this.props.navigation.navigate("Cart",{details:this.state.data,TotalPrice:price})
  }
  subtractItem=(item,index)=>{
      let {data}=this.state
      if(item.itemsAdded> 0){
        data[index].itemsAdded=item.itemsAdded-1
        if(this.state.addedItems>0){
        this.setState({addedItems:this.state.addedItems-1})
      
        
        }
      }
      
      this.setState({data:data})
    
  }
  _renderItem=({item,index})=>{
    return(
       <View style={{padding:10,marginHorizontal:10}} >
        <View style={{flexDirection:"row"}}>
         <Text style={ListStyle.title}>{item.title}</Text>
         <View style={{flexDirection:"row",position:"absolute",left:Dimensions.get("window").width/1.6,bottom:1,borderWidth:1,paddingLeft:5,paddingRight:5,height:30,borderColor:"#FA8072"}}>
           <TouchableOpacity onPress={()=>this.subtractItem(item,index)}>
             <MaterialCommunityIcons name="minus" size={20} style={{color:"black",top:6}}></MaterialCommunityIcons>
             {/* <Text style={{fontSize:25,bottom:5}}>-</Text> */}
           </TouchableOpacity>
           <View style={{width:50,alignItems:"center",justifyContent:"center"}}>
             <Text style={{paddingLeft:5}}>{item.itemsAdded} </Text>
           </View>
           
           <TouchableOpacity onPress={()=>this.addItem(item,index)}>
             {/* <Text style={{fontSize:25,bottom:5}}>+</Text> */}
             <MaterialCommunityIcons name="plus" size={20} style={{color:"black",top:6}}></MaterialCommunityIcons>
           </TouchableOpacity>
         </View>
         </View>
         <Text >{item.description}</Text>
         <Text style={{color:"#ffcccb",fontSize:20}}>{item.price+`$`}</Text>
       </View>
    
    )
}
_HeaderItem=()=>{
  return(
    <View style={{paddingLeft:20}}>
    <Text style={{fontSize:25}}>Starter</Text>
    </View>
  )
}

  render(){
    return(
      <View style={ListStyle.container} >
           <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
      
        renderHeader={() => (
          <View style={{flexDirection:"row"}} >
         
          <Image source={require('./../assets/food-banner5.jpg')} style={ListStyle.image}  />
        
          <View style={{alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:30}}>Inka Restaurant</Text>

          </View>
          </View>

          
        )}
     
          renderForeground={()=>{
            <Animatable.View style={ListStyle.titleContainer}>
              <Text>Inka Restaurant </Text>
            </Animatable.View>
          }}
          renderFixedForeground={()=>{
            <Animatable.View style={ListStyle.navTitleView}>
              <Text>Inka Restaurant </Text>
            </Animatable.View>
          }}
      >
        <TriggeringView>
     
       <FlatList
      style={{paddingTop:20}}
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this._HeaderItem}
        >
        
        </FlatList>
        </TriggeringView>
        </HeaderImageScrollView>
       <TouchableOpacity style={ListStyle.cart} onPress={()=>this.viewCart()} >
         <View style={{alignItems:"center",justifyContent:"center",marginTop:Dimensions.get("window").height/45,flexDirection:"row",}}>
           <AntDesign name="shoppingcart" size={25} style={{color:"white"}}></AntDesign>
          <Text style={{color:"white",fontSize:20,paddingLeft:10}}>VIEW CART</Text>
          <Text style={{color:"white",fontSize:20,paddingLeft:10}}>[{this.state.addedItems} ITEMS] </Text>
    
          </View>
       </TouchableOpacity>
      </View>
    )
  }

}

const ListStyle=StyleSheet.create({
  container:{
    flex:1,
  
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title:{
    fontSize:16
  },
  cart:{
    backgroundColor:"black",
    height:Dimensions.get("window").height/9,
    width:Dimensions.get("window").width,
  
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer:{
    backgroundColor:"white",
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },


})