declare module 'zzj-player' {
    export interface PlayerAPI {
        // 播放视频
        play(): void;

        // 暂停视频
        pause(): void;

        // 跳转到特定时间（秒）
        seek(time: number): void;

        // 切换播放和暂停
        toggle(): void;

        // 绑定视频和播放器事件
        on(event: string, handler: () => void): void;

        // 切换到其他视频
        switchVideo(
            video: {
                url?: string;
                pic?: string;
                thumbnails?: string;
            },
            danmaku?: {
                id?: string;
                api?: string;
                maximum?: number;
                user?: string;
            }
        ): void;

        // 显示通知
        notice(text: string, time?: number): void;

        // 切换清晰度
        switchQuality(index: number): void;

        // 销毁播放器
        destroy(): void;

        // 设置视频速度
        speed(rate: number): void;

        // 设置视频音量
        volume(percentage: number, nostorage?: boolean, nonotice?: boolean): void;

        // 原生 video 接口
        video: HTMLVideoElement;

        // 弹幕接口
        danmaku: {
            // 提交一个新弹幕
            send(
                danmaku: {
                    text: string;
                    color?: string;
                    type?: 'top' | 'bottom' | 'right';
                },
                callback?: () => void
            ): void;

            // 实时绘制一个新弹幕
            draw(danmaku: { text: string; color?: string; type?: 'top' | 'bottom' | 'right' }): void;

            // 设置弹幕透明度
            opacity(percentage: number): void;

            // 清除所有弹幕
            clear(): void;

            // 隐藏弹幕
            hide(): void;

            // 显示弹幕
            show(): void;
        };

        // 全屏接口
        fullScreen: {
            // 进入全屏
            request(type: 'web' | 'browser'): void;
            // 退出全屏
            cancel(type: 'web' | 'browser'): void;
        };
    }

    export interface PlayerOptions {
        // 播放器容器元素
        container: HTMLElement | string;

        // 视频全屏时顶部的标题
        title?: string;

        // 是否开启直播模式
        live?: boolean;

        // 视频自动播放
        autoplay?: boolean;

        // 主题色，默认为 '#b7daff'
        theme?: string;

        // 视频循环播放
        loop?: boolean;

        // 语言设置，默认为浏览器语言
        lang?: string;

        // 开启截图功能，需要视频和封面允许跨域
        screenshot?: boolean;

        // 支持快进、快退、音量控制、播放暂停的热键
        hotkey?: boolean;

        // 在 Safari 中开启 AirPlay
        airplay?: boolean;

        // 启用 Chromecast
        chromecast?: boolean;

        // 视频预加载设置，可选 'none', 'metadata', 'auto'
        preload?: string;

        // 默认音量，播放器会记忆用户设置
        volume?: number;

        // 可选的播放速率数组
        playbackSpeed?: number[];

        // 在左上角展示的 logo
        logo?: string;

        // 自定义弹幕和获取发送弹幕行为的后端接口
        apiBackend?: any; // 这里需要具体化 apiBackend 的结构

        // 阻止点击播放器自动切换播放/暂停
        preventClickToggle?: boolean;

        // 视频信息配置
        video: {
            // 清晰度选项，需要具体化结构
            quality?: any[];

            // 默认清晰度
            defaultQuality?: string;

            // 视频链接
            url: string;

            // 视频封面
            pic?: string;

            // 视频缩略图，使用 DPlayer-thumbnails 生成
            thumbnails?: any[];

            // 视频类型
            type?: string;

            // 自定义类型，需要具体化结构
            customType?: any;
        };

        // 外挂字幕配置
        subtitle?: {
            // 字幕链接
            url: string;
            type?: 'webvtt' | 'ass';
            fontSize?: string;
            bottom?: string;
            color?: string;
        };

        // 弹幕配置
        danmaku?: {
            // 弹幕池 id，必须唯一
            id: string;
            // 弹幕接口，需要具体化结构
            api: any;
            token?: string;
            maximum?: number;
            // 额外外挂弹幕，需要具体化结构
            addition?: any;
            user?: string;
            bottom?: string;
            unlimited?: boolean;
            speedRate?: number;
        };

        // 自定义右键菜单
        contextmenu?: any[];

        // 自定义进度条提示点
        highlight?: any[];

        // 互斥设置，阻止多个播放器同时播放
        mutex?: boolean;
    }

    class Player {
        // @ts-ignore
        constructor(options: PlayerOptions): void;
    }
    export default Player;
}
