"use strict";

import React from "react";
import PropTypes from "prop-types";

import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import PickerCategory from "./PickerCategory";
import styles from "./style";
import BaseComponent from "./BaseComponent";
import LinearGradient from "react-native-linear-gradient";
import IconAD from "react-native-vector-icons/AntDesign";
import moment from "moment";
import Theme from "../../src/Theme";
import Modal, { ModalContent } from 'react-native-modals';

const { width, height } = Dimensions.get("window");

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  initValue: PropTypes.array,
  label: PropTypes.array,
  height: PropTypes.number,
  gradientStyle: PropTypes.object,
  selectorColor: PropTypes.array
};

const defaultProps = {
  data: [],
  onChange: () => {},
  initValue: [],
  style: {},
  selectStyle: {},
  cancelStyle: {},
  label: [],
  height: 1,
  gradientStyle: {
    start: { x: 0.0, y: 0 },
    end: { x: 1, y: 1.0 },
    locations: [0, 1],
    colors: [Theme.white, Theme.lightGray]
  },
  selectorColor: ["#B171B3","#CCA3CD","#CCA3CD"]
};

export default class ModalPicker extends BaseComponent {
  constructor(props) {
    super(props);

    this._bind("onChange", "open", "close", "renderChildren", "accept");
    this.state = {
      animationType: "fade",
      modalVisible: false,
      transparent: false,
      selected: "please select",
      selection: new Array(this.props.data.length)
    };
  }

  componentWillMount() {
    if (this.props.initValue.length == 1) {
      this.props.initValue[0] = Number(this.props.initValue[0]);
    }
    this.setState({ selection: this.props.initValue });
  }

  onChange = (item, catId) => {
    const selection = this.state.selection;
    selection[catId] = item;
    this.setState(selection);
  };

  close() {
    if (this.props.initValue) {
      const initValue = this.props.initValue;
      this.setState({ selection: initValue });
    }

    this.setState({
      modalVisible: false
    });
  }

  accept() {
    this.props.onChange(this.state.selection);

    this.setState({
      modalVisible: false
    });
  }

  open() {
    this.setState({
      modalVisible: true,
      selection: this.props.initValue
    });
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return <Text></Text>;
  }

  renderOptionList(catItem, catId, catNum) {
    return (
      <View
        name={this.props.name}
        key={catId}
        style={{
          width: (width * 1) / this.props.data.length,
        }}
      >
        <PickerCategory
          name={this.props.name}
          key={catId}
          initValue={this.props.initValue}
          catId={catId}
          catNum={catNum}
          data={catItem}
          onPress={this.onChange}
          selectorColor={this.props.selectorColor}
        />
      </View>
    );
  }

  showDays() {
    const year = this.state.selection[2] || moment().year();
    const month = this.state.selection[1] || moment().month();
    const countDayes = moment(year + "-" + month).daysInMonth();
    const days = new Array(countDayes).fill({ label: null }).map((item, id) => {
      const option = id + 1;
      return {
        label: option,
        key: option
      };
    });
    return days;
  }

  renderCategory() {
    const catNum = this.props.data.length;
    let catId = -1;
    let catShow = this.props.data.map(catItem => {
      catId++;
      if (catId == 0 && catNum == 3 && this.props.data[0].length == 0) {
        catItem = this.showDays();
      }
      return this.renderOptionList(catItem, catId, catNum);
    });

    let pickerHeight = 88;
    let propsHeight = this.props.height;

    if (propsHeight * 1) {
      propsHeight = propsHeight < 0 ? 0 : propsHeight;

      propsHeight = propsHeight > 1 ? 1 : propsHeight;

      pickerHeight = 88 * propsHeight;
    }
    return (
      <View style={{ flex: 1, height: height, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: pickerHeight + "%",
          }}
        >
          {catShow}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={this.close}>
            <View style={styles.cancelStyle}>
              <IconAD name="close" size={25} color={Theme.gray2} />
            </View>
          </TouchableOpacity>

          <Text
            style={[
              {
                width: "60%",
                color: Theme.gray1,
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
                fontSize: 13,
                fontFamily: Theme.primaryFontFamily,
                textTransform: "uppercase"
              },
              this.props.bottomLabel.style
            ]}
          >
            {this.props.bottomLabel.text || ""}
          </Text>

          <TouchableOpacity onPress={this.accept}>
            <View style={styles.acceptStyle}>
              <IconAD name="check" size={30} color={Theme.color2} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const dp = (
      <Modal
        width={width * 1.1}
        height={Platform.OS == 'ios' ? height * 1.1 : height * 1.2}
        visible={this.state.modalVisible}
        onTouchOutside={this.close}
      >
        <ModalContent style={{ flex: 1 }}>
          <LinearGradient
            start={this.props.gradientStyle.start}
            end={this.props.gradientStyle.end}
            locations={this.props.gradientStyle.locations}
            colors={this.props.gradientStyle.colors}
            style={{
              flex: 1
            }}
          >
            {this.renderCategory()}
          </LinearGradient>
        </ModalContent>
      </Modal>
    );

    return (
      <View style={[{ alignSelf: 'center', width: '100%' }, this.props.style,]}>
        {dp}
        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

ModalPicker.propTypes = propTypes;
ModalPicker.defaultProps = defaultProps;
