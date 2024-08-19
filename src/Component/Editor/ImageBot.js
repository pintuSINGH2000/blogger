import Quill from 'quill';

// Define custom ImageBlot class
const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', value);
    node.style.width = '300px';
    node.style.height = '300px';
    node.style.display = 'block';
    node.style.margin = 'auto';
    return node;
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

Quill.register(ImageBlot);

export default ImageBlot;
