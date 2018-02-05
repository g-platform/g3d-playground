import React, {Component} from 'react';

import AceEditor from 'react-ace';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';


const styles = {
  container: {
    height: '100%'
  }
};


class CodeEditor extends Component {

  render() {

    let {code, onCodeChange, width, height} = this.props;

    return (
      <div style={styles.container}>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={onCodeChange}
          name="example"
          width={`${width}px`}
          height={`${height}px`}
          value={code}
          editorProps={{
            $blockScrolling: Infinity
          }}
        />
      </div>
    )
  }
}

export default CodeEditor;
