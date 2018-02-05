import React, { Component } from 'react';
import { render } from 'react-dom';

import { debounce, property } from 'lodash';

import Layout from './components/layout';
import Screen from './components/screen';
import Info from './components/info';
import CodeEditor from './components/code-editor';
import Menu from './components/menu';
import WeexPreviewer from './components/weex-previewer';

import './index.less';

import samples from './samples/index';



const hash = (function () {
    const query = location.hash.substr(1);
    const result = {};
    query.split('&').forEach(function (part) {
        const item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
})();
const itemPath = hash.item;

class App extends Component {

    state = {
        code: itemPath ?
            property(itemPath)(samples):
            samples['guide'][
            Object.keys(samples['guide'])[0]
            ],
        error: null
    };

    componentDidMount() {

    }

    onCodeChange = debounce((code) => {
        this.setState({ code });
    }, 500);

    onCodeError = error => {
        if (error) {
            this.setState({
                error
            })
        } else {
            this.setState({
                error: null
            })
        }
    }

    onClickMenu = key => {
        const code = property(key.split('/'))(samples);
        this.setState({ code });
    }

    render() {

        return (
            <Layout>
                <Menu onClick={this.onClickMenu} samples={samples} />
                <Screen sample={this.state.code} onError={this.onCodeError} />
                <Info error={this.state.error} />
                <CodeEditor code={this.state.code} onCodeChange={this.onCodeChange} />
                <WeexPreviewer code={this.state.code} canPreview={!this.state.error} />
            </Layout>
        )
    }
}






render(<App />, document.getElementById('root'));