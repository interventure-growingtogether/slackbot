import CssBaseline from '@material-ui/core/CssBaseline';
import App from 'next/app';
import Head from 'next/head';
import * as React from 'react';

export default class SlackBotApp extends App {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <>
                <Head>
                    <title>IV | SlackBot</title>
                </Head>
                <CssBaseline />
                <Component {...pageProps} />
            </>
        );
    }
}
