import React, { Component, Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'

class RichEditor extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      data,
      uploadUrl,
      getRichData
    } = this.props
    return (
      <Fragment>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          config={{
            language: 'zh-cn',
            ckfinder: {
              uploadUrl: uploadUrl,
            },
          }}
          onBlur={ ( event, editor ) => {
            const data = editor.getData();
            getRichData(data)
          }}
        />
      </Fragment>
    );
  }
}

export default RichEditor;