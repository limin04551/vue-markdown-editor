// base css
import '@/styles/index.scss';
// font css
import '@/assets/css/font';

import Preview from '@/preview';
import Container from '@/components/container';
import Scrollbar from '@/components/scrollbar/index';
import TocNav from '@/components/toc-nav';

import EDITOR_MODE from '@/utils/constants/editor-mode';

export default {
  inheritAttrs: false,
  components: {
    [Preview.name]: Preview,
    [Container.name]: Container,
    [Scrollbar.name]: Scrollbar,
    [TocNav.name]: TocNav,
  },
  provide() {
    return {
      markdownEditor: this,
    };
  },
  props: {
    height: String,
    theme: Object,
    mode: {
      type: String,
      default: EDITOR_MODE.EDITABLE,
    },
  },
  created() {
    if (this.theme) this.$options.use(this.theme);
  },
  computed: {
    isPreviewMode() {
      return this.mode === EDITOR_MODE.PREVIEW;
    },
  },
  methods: {
    // change event
    handleChange(text, html) {
      this.$emit('change', text, html);
    },
    save() {
      this.$emit('save', this.text, this.$refs.preview.html);
    },
    insert(getInsertContent) {
      this.focus();

      const currentSelectedStr = this.getCurrentSelectedStr();
      const { selected, text } = getInsertContent(currentSelectedStr);

      this.replaceSelectionText(text);

      this.$nextTick(() => {
        this.changeSelctionTo(text, selected);
      });
    },
  },
};