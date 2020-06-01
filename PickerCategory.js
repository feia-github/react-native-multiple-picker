import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import Theme from "../../src/Theme";

class PickerCategory extends Component {
  constructor(props) {
    super(props);
    var initValue = this.props.initValue[this.props.catId];
    this.state = {
      selectedId: initValue
    };
  }

  getSelectedIndex = () => {
    let initialIndex = 0;
    if (this.props.initValue[this.props.catId]) {
      const selectedElement = this.props.initValue[this.props.catId];
      const index2 = this.props.data.findIndex(
        element => element.key == selectedElement
      );
      if (index2 > 0) {
        initialIndex = index2;
      }
    }
    return initialIndex;
  };

  goToOffset = () => {
    let heigthOfSelectedItem = 0;

    if (
      this.flatList_Ref &&
      this.flatList_Ref._listRef._frames[0]
    ) {

      heigthOfSelectedItem = this.flatList_Ref._listRef._frames[
        0
      ].length;
    }
    let countOfItemsInScreen = Math.round(
      this.flatList_Ref._listRef._scrollMetrics.visibleLength /
        heigthOfSelectedItem
    );
      
    this.flatList_Ref.scrollToOffset({
      animated: true,
      offset: heigthOfSelectedItem *
      (this.getSelectedIndex() - countOfItemsInScreen / 2)
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.goToOffset();
    }, 500);
  }

  buttonPress = item => {
    this.setState({ selectedId: item.key });
    this.props.onPress(item.key, this.props.catId);
  };

  renderItem = item => {
    if (!item.addText) {
      item.addText = "";
    }
    

    const { selectedId } = this.state;
    const { items, textStyle, textStyleSelected } = styles;
    const isSelected = selectedId == item.key;
    let selectedItem = {...styles.selectedItemMiddle};
    let lessThanTen = item.label < 10 ? '0' + item.label : item.label

    if (this.props.catId == 0) {
      selectedItem = {...styles.selectedItemFirst};
    } else if (this.props.catId == this.props.catNum - 1) {
      selectedItem = styles.selectedItemLast;
    }

    selectedItem = {...selectedItem, backgroundColor:this.props.selectorColor[this.props.catId]}

    return (
      <TouchableWithoutFeedback onPress={() => this.buttonPress(item)}>
        <View
          style={[
            items,
            isSelected && selectedItem,
            this.props.catId == 0
              ? {
                  alignItems: "flex-end",
                  paddingRight: "10%",
                  width:'90%'
                  }
              : {
                  alignItems: "flex-start",
                  paddingLeft: "10%",
                  alignSelf: "flex-end",
                  width:'90%'
                },
            this.props.catId == 0 &&
              this.props.catNum == 1 && {
                width: "59%",
                paddingRight: "5%",
                
              },
            this.props.catNum == 3 &&
              this.props.catId == 1 && {
                alignItems: "center",
                width:'100%',
                paddingLeft: 0, 
              },
            isSelected &&
              this.props.catId == 0 &&
              this.props.catNum == 1 && { width: "67.5%" },
            !isSelected &&
              this.props.catNum == 2 &&
              this.props.catId == 0 && {
                width: "80%"
            },
            this.props.catNum == 2 && this.props.catId == 0 && {
              alignItems: 'flex-start',
              paddingLeft:'53%'
            }
          ]}
        >
          <Text
            style={[
              textStyle,
              isSelected && textStyleSelected,
              {
                fontFamily: Theme.numberFontFamily,
                fontSize: 20,
                textAlign: "center"
              }
            ]}
          >
            {isSelected ? lessThanTen + item.addText : lessThanTen}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%"}}>
        <FlatList
          name={this.props.name}
          style={{ flex: 1, width: "100%" }}
          data={this.props.data}
          removeClippedSubviews={true}
          ref={ref => {
            this.flatList_Ref = ref;
          }}
          keyExtractor = { (item, index) => index.toString() }
          initialNumToRender={100}
          renderItem={({ item }) => {
            return this.renderItem(item);
          }}
        />
      </View>
    );
  }
}
const styles = {
  items: {
    marginVertical: 8,
    paddingVertical: 9,
    // paddingVertical: 18,
    width: "93%",
  },
  selectedItemFirst: {
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    // paddingVertical:'8%'
  },
  selectedItemLast: {
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    // paddingVertical:'8%'
  },
  selectedItemMiddle: {
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    // paddingVertical:'8%'
  },
  textStyle: {
    color: Theme.gray1,

  },
  textStyleSelected: {
    color: Theme.white,
  }
};

export default PickerCategory;
