import Vue, { mergeData } from '../../vue';
import { NAME_CARD_GROUP } from '../../constants/components';
export var props = {
  tag: {
    type: String,
    default: 'div'
  },
  deck: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Boolean,
    default: false
  }
}; // @vue/component

export var BCardGroup = /*#__PURE__*/Vue.extend({
  name: NAME_CARD_GROUP,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, mergeData(data, {
      class: props.deck ? 'card-deck' : props.columns ? 'card-columns' : 'card-group'
    }), children);
  }
});