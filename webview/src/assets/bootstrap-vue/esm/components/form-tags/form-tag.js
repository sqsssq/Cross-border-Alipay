import Vue from '../../vue';
import { NAME_FORM_TAG } from '../../constants/components';
import { CODE_DELETE } from '../../constants/key-codes';
import { getComponentConfig } from '../../utils/config';
import idMixin from '../../mixins/id';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import { BBadge } from '../badge/badge';
import { BButtonClose } from '../button/button-close';
export var BFormTag = /*#__PURE__*/Vue.extend({
  name: NAME_FORM_TAG,
  mixins: [idMixin, normalizeSlotMixin],
  props: {
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME_FORM_TAG, 'variant');
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String // default: null

    },
    pill: {
      type: Boolean,
      default: false
    },
    removeLabel: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME_FORM_TAG, 'removeLabel');
      }
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  methods: {
    onDelete: function onDelete(evt) {
      var type = evt.type,
          keyCode = evt.keyCode;

      if (!this.disabled && (type === 'click' || type === 'keydown' && keyCode === CODE_DELETE)) {
        this.$emit('remove');
      }
    }
  },
  render: function render(h) {
    var tagId = this.safeId();
    var tagLabelId = this.safeId('_taglabel_');
    var $remove = h();

    if (!this.disabled) {
      $remove = h(BButtonClose, {
        staticClass: 'b-form-tag-remove',
        props: {
          ariaLabel: this.removeLabel
        },
        attrs: {
          'aria-controls': tagId,
          'aria-describedby': tagLabelId,
          'aria-keyshortcuts': 'Delete'
        },
        on: {
          click: this.onDelete,
          keydown: this.onDelete
        }
      });
    }

    var $tag = h('span', {
      staticClass: 'b-form-tag-content flex-grow-1 text-truncate',
      attrs: {
        id: tagLabelId
      }
    }, this.normalizeSlot() || this.title || [h()]);
    return h(BBadge, {
      staticClass: 'b-form-tag d-inline-flex align-items-baseline mw-100',
      class: {
        disabled: this.disabled
      },
      attrs: {
        id: tagId,
        title: this.title || null,
        'aria-labelledby': tagLabelId
      },
      props: {
        tag: this.tag,
        variant: this.variant,
        pill: this.pill
      }
    }, [$tag, $remove]);
  }
});