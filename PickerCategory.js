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
      this.flatList_Ref._listRef._frames[this.props.initValue[this.props.catId]]
    ) {
      heigthOfSelectedItem = this.flatList_Ref._listRef._frames[
        this.props.initValue[this.props.catId]
      ].length;
      console.log(
        "hi",
        this.flatList_Ref._listRef._frames[
          this.props.initValue[this.props.catId].length
        ]
      );
    }
    let countOfItemsInScreen = Math.round(
      this.flatList_Ref._listRef._scrollMetrics.visibleLength /
        heigthOfSelectedItem
    );
    offsset =
      heigthOfSelectedItem *
      (this.getSelectedIndex() - countOfItemsInScreen / 2);
    this.flatList_Ref.scrollToOffset({
      animated: true,
      offset: offsset
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
    let selectedItem = styles.selectedItemMiddle;

    if (this.props.catId == 0) {
      selectedItem = styles.selectedItemFirst;
    } else if (this.props.catId == this.props.catNum - 1) {
      selectedItem = styles.selectedItemLast;
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.buttonPress(item)}>
        <View
          style={[
            items,
            isSelected && selectedItem,
            this.props.catId == 0
              ? {
                  alignItems: "flex-end",
                  paddingRight: "10%"
                }
              : {
                  alignItems: "flex-start",
                  paddingLeft: "10%",
                  alignSelf: "flex-end"
                },
            this.props.catId == 0 &&
              this.props.catNum == 1 && {
                width: "59%",
                paddingRight: "5%"
              },
            this.props.catNum == 3 &&
              this.props.catId == 1 && {
                alignItems: "center"
              },
            isSelected &&
              this.props.catId == 0 &&
              this.props.catNum == 1 && { width: "67.5%" },
            !isSelected &&
              this.props.catNum == 2 &&
              this.props.catId == 0 && {
                width: "80%"
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
            {isSelected ? item.label + item.addText : item.label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          name={this.props.name}
          style={{ flex: 1, width: "100%" }}
          data={this.props.data}
          removeClippedSubviews={true}
          ref={ref => {
            this.flatList_Ref = ref;
          }}
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
    paddingVertical: 9,
    width: "93%"
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
    color: Theme.gray1
  },
  textStyleSelected: {
    color: Theme.white
  }
};

export default PickerCategory;
