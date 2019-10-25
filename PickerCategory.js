import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
class PickerCategory extends Component {
  constructor(props) {
    super(props);
    if (this.props.initValue) {
      var initValue = this.props.initValue[this.props.catId];
    }

    this.state = {
      selectedId: initValue
    };
  }

  goToIndex = () => {
    // if (this.props.initValue[this.props.catId]) {
    //   let selelement = this.props.initValue[this.props.catId];
    //   const index2 = this.props.data.findIndex(
    //     element => element.key === selelement
    //   );
    //   this.flatList_Ref.scrollToIndex({ animated: true, index: index2 });
    // }
  };

  getSelectedIndex = () => {
    let initialIndex = 0;
    if (this.props.initValue[this.props.catId]) {
      let selelement = this.props.initValue[this.props.catId];
      const index2 = this.props.data.findIndex(
        element => element.key === selelement
      );
      console.log({ selelement, index2 });
      if (index2 > 0) {
        initialIndex = index2;
      }
      console.log({ selelement, index2, initialIndex });
    }
    return initialIndex;
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.flatList_Ref.scrollToIndex({ animated: true, index: 10 });
    // }, 3000);
  }

  // componentDidMount() {
  //   console.log(this.flatList_Ref);
  //   // this.flatList_Ref.scrollToIndex({ animated: true, index: 3 });
  // }

  buttonPress = item => {
    this.setState({ selectedId: item.key });
    this.props.onPress(item.key, this.props.catId);
  };

  renderItem = item => {
    const { selectedId } = this.state;
    const { items, textStyle, textStyleSelected } = styles;
    const isSelected = selectedId === item.key;
    let selectedItem = styles.selectedItemMiddle;

    if (this.props.catId === 0) {
      selectedItem = styles.selectedItemFirst;
    } else if (this.props.catId === this.props.catNum - 1) {
      selectedItem = styles.selectedItemLast;
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.buttonPress(item)}>
        <View
          style={[
            items,

            isSelected && selectedItem,
            this.props.catId === 0
              ? {
                  alignItems: "flex-end",
                  width: "93%"
                }
              : {
                  alignItems: "center",
                  width: "93%",
                  left: "8%"
                }
          ]}
        >
          <Text
            style={[
              textStyle,
              isSelected && textStyleSelected,
              {
                fontFamily: "Montserrat",
                fontSize: 20,
                alignSelf: "flex-start",
                textAlign: "center"
              },
              !isSelected && this.props.catId === 0
                ? { left: "57%" }
                : { left: "17%" },
              isSelected && this.props.catId === 0 ? { left: "57%" } : {},
              this.props.catId !== 1 &&
              this.props.catId !== this.props.catNum &&
              this.props.catNum >= 3
                ? {}
                : { left: "50%" }
            ]}
          >
            {item.addText ? item.label + item.addText : item.label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={this.props.data}
          removeClippedSubviews={true}
          ref={ref => {
            this.flatList_Ref = ref;
          }}
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
    paddingVertical: 9
  },
  selectedItemFirst: {
    backgroundColor: "#B171B3",
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40
  },
  selectedItemLast: {
    backgroundColor: "#CCA3CD",
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40
  },
  selectedItemMiddle: {
    backgroundColor: "#CCA3CD",
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40
  },
  textStyle: {
    color: "#666666"
  },
  textStyleSelected: {
    color: "#ffffff"
  }
};

export default PickerCategory;
