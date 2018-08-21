---
id: getting-started
title: IPFS中文教程-入门指南
permalink: docs/getting-started.html
redirect_from:
  - "docs/"
  - "docs/index.html"
  - "docs/getting-started-ko-KR.html"
  - "docs/getting-started-zh-CN.html"
  - "docs/installation.html"
  - "download.html"
  - "downloads.html"
  - "docs/try-react.html"
  - "docs/tooling-integration.html"
  - "docs/package-management.html"
  - "docs/language-tooling.html"
  - "docs/environments.html"
---

如果你已经完成本章节

可直接阅读 [安装IPFS](https://ipfs.io/docs/install/)
在阅读本教程的过程中,如果有任何的疑问,可以访问 <https://discuss.ipfs.io/> 或者在 chat.freenode.net 上联系 #ipfs

## 初始化库

ipfs使用一个全局本地对象库, 添加到~/.ipfs:

```
> ipfs init
initializing ipfs node at /Users/jbenet/.go-ipfs
generating 2048-bit RSA keypair...done
peer identity: Qmcpo2iLBikrdf1d6QU6vXuNb6P7hwrbNPW9kLAH8eG67z
to get started, enter:

ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme
```

注意这里的哈希值和你得到的是不同的,你需要使用你初始化时得到的哈希值.
现在运行如下命令:

`ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme`

你会看到类似这样的输出:

```
Hello and Welcome to IPFS!

██╗██████╗ ███████╗███████╗
██║██╔══██╗██╔════╝██╔════╝
██║██████╔╝█████╗  ███████╗
██║██╔═══╝ ██╔══╝  ╚════██║
██║██║     ██║     ███████║
╚═╝╚═╝     ╚═╝     ╚══════╝
```

如果你能看到这样的输出,那么你已经成功的安装了IPFS, 并且现在通过接口方式访问Merkle DAG!

```
 -------------------------------------------------------
| 警告:                                              |
|   这是一个alpha版本软件. 自行决定是否使用|
|   还存在很多遗漏和不完善. 也存在缺陷.  |
|   还不够安全.阅读安全说明了解更多信息.   |
 -------------------------------------------------------
```

查看目录中的其他文件:

./about
./help
./quick-start <-- 使用实例
./readme <-- 本文件
./security-notes

你可以查看其他的内容. 试试快速启动（quick-start):

`ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/quick-start`

您将会看到一些有趣的例子.

## 上线

一旦你已经准备好上线, 在另外一终端上运行ipfs的后台进程:

```
> ipfs daemon
Initializing daemon...
API server listening on /ip4/127.0.0.1/tcp/5001
Gateway server listening on /ip4/127.0.0.1/tcp/8080
Wait for all three lines to appear.
```

记下你得到的tcp端口信息。 如果它们和这里的不同，请在以下命令中使用你自己得到的端口信息。
现在，切换回原来的终端界面。 如果计算机连接了网络，你应该能够看到对等方的ipfs地址：

```
> ipfs swarm peers
/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
/ip4/134.121.64.93/tcp/1035/ipfs/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5
/ip4/178.62.8.190/tcp/4002/ipfs/QmdXzZ25cyzSF99csCQmmPZ1NTbWTe8qtKFaZKpZQPdTFB
```

是一个`<传输地址>/ipfs/<哈希公钥>`的组合.
现在你应该能够从网络获取到对象. 输入如下命令:

```
ipfs cat /ipfs/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg >cat.jpg
open cat.jpg
```

还有,你也应该能够提供网络对象. 尝试增加一个, 然后从你的浏览器里查看它.在此示例中，我们使用curl的方式浏览，当然您也可以在其他浏览器中打开IPFS URL地址：

```
> hash=`echo "I <3 IPFS -$(whoami)" | ipfs add -q`
> curl "https://ipfs.io/ipfs/$hash"
I <3 IPFS -<your username>
```

是不是很炫酷? 在计算机上,网关提供一个文件。 网关查询DHT，找到您的机器，请求文件，机器将这个文件发送给网关，网关将其发送到浏览器

注意: 依赖于网络环境的不同, curl请求可能会花一点时间.公共网关可能会过载,或者是请求会耗时比较久才能到达. 你也可以通过本地的网关来检查:

```
> curl "http://127.0.0.1:8080/ipfs/$hash"
I <3 IPFS -<your username>
```

默认情况下, 你的网关是不会暴露的,仅仅是本地开放.

## 超炫的网页控制台

我们有一网页控制台用于检查节点的状态.使用浏览器打开地址:
<http://localhost:5001/webui>
网页控制台的界面:
[![webui-connection](https://user-images.githubusercontent.com/8011473/44325062-36679400-a48a-11e8-8d37-b44f03f1e4bd.png)](https://user-images.githubusercontent.com/8011473/44325062-36679400-a48a-11e8-8d37-b44f03f1e4bd.png)

现在,你已经准备好了,可以查看:
[更多的例子](https://ipfs.io/docs/examples/)

---

Tip
打赏

译者
ETH: `0x7CdaF81D544E2a3bd993e639D1a4d6785067cB24`

校对
ETH: `0x6bcCfb7265d4aB0C1a71F7d19b9E581cae73D777`

站长
1. BTC: `1Af2Q23Y1kqgtgbryzjS7RxrnEmyvYuX4b`
2. ETH: `0x6bcCfb7265d4aB0C1a71F7d19b9E581cae73D777`