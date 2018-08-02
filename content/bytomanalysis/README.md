剥开比原看代码
===========

通过问题驱动，由外而内，一点点剥开[比原](https://github.com/Bytom/bytom)坚硬的外壳，看到里面的代码：

(注：本系列中使用的代码基于bytom v1.0.1版本)

1. [初始化时生成的配置文件在哪儿？](https://github.com/freewind/bytom.win/blob/master/101.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E5%88%9D%E5%A7%8B%E5%8C%96%E6%97%B6%E7%94%9F%E6%88%90%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%9C%A8%E5%93%AA%E5%84%BF.md)
1. [比原启动后去哪里连接别的节点？](https://github.com/freewind/bytom.win/blob/master/102.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E5%90%AF%E5%8A%A8%E5%90%8E%E5%8E%BB%E5%93%AA%E9%87%8C%E8%BF%9E%E6%8E%A5%E5%88%AB%E7%9A%84%E8%8A%82%E7%82%B9.md)
1. [比原是如何监听p2p端口的？](https://github.com/freewind/bytom.win/blob/master/103.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E7%9B%91%E5%90%ACp2p%E7%AB%AF%E5%8F%A3%E7%9A%84.md)
1. [如何连上一个比原节点？](https://github.com/freewind/bytom.win/blob/master/104.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E5%A6%82%E4%BD%95%E8%BF%9E%E4%B8%8A%E4%B8%80%E4%B8%AA%E6%AF%94%E5%8E%9F%E8%8A%82%E7%82%B9.md)
1. [如何从比原节点拿到区块数据？](https://github.com/freewind/bytom.win/blob/master/105.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E5%A6%82%E4%BD%95%E4%BB%8E%E6%AF%94%E5%8E%9F%E8%8A%82%E7%82%B9%E6%8B%BF%E5%88%B0%E5%8C%BA%E5%9D%97%E6%95%B0%E6%8D%AE.md)
1. [比原是如何把请求区块数据的信息发出去的？](https://github.com/freewind/bytom.win/blob/master/106.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E6%8A%8A%E8%AF%B7%E6%B1%82%E5%8C%BA%E5%9D%97%E6%95%B0%E6%8D%AE%E7%9A%84%E4%BF%A1%E6%81%AF%E5%8F%91%E5%87%BA%E5%8E%BB%E7%9A%84.md)
1. [比原节点收到“请求区块数据”的信息后如何应答？](https://github.com/freewind/bytom.win/blob/master/107.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E8%8A%82%E7%82%B9%E6%94%B6%E5%88%B0%E2%80%9C%E8%AF%B7%E6%B1%82%E5%8C%BA%E5%9D%97%E6%95%B0%E6%8D%AE%E2%80%9D%E7%9A%84%E4%BF%A1%E6%81%AF%E5%90%8E%E5%A6%82%E4%BD%95%E5%BA%94%E7%AD%94.md)
1. [比原的Dashboard是怎么做出来的？](https://github.com/freewind/bytom.win/blob/master/108.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E7%9A%84Dashboard%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E5%87%BA%E6%9D%A5%E7%9A%84.md)
1. [通过dashboard创建密钥时，前端的数据是如何传到后端的？](https://github.com/freewind/bytom.win/blob/master/109.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E9%80%9A%E8%BF%87dashboard%E5%88%9B%E5%BB%BA%E5%AF%86%E9%92%A5%E6%97%B6%EF%BC%8C%E5%89%8D%E7%AB%AF%E7%9A%84%E6%95%B0%E6%8D%AE%E6%98%AF%E5%A6%82%E4%BD%95%E4%BC%A0%E5%88%B0%E5%90%8E%E7%AB%AF%E7%9A%84.md)
1. [比原是如何通过接口`/create-key`创建密钥的？](https://github.com/freewind/bytom.win/blob/master/110.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87create-key%E6%8E%A5%E5%8F%A3%E5%88%9B%E5%BB%BA%E5%AF%86%E9%92%A5%E7%9A%84.md)
1. [比原是如何通过接口`/create-account`创建帐户的？](https://github.com/freewind/bytom.win/blob/master/111.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87create-account%E6%8E%A5%E5%8F%A3%E5%88%9B%E5%BB%BA%E5%B8%90%E6%88%B7%E7%9A%84.md)
1. [比原是如何通过`/create-account-receiver`创建地址的？](https://github.com/freewind/bytom.win/blob/master/112.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87%60create-account-receiver%60%E5%88%9B%E5%BB%BA%E5%9C%B0%E5%9D%80%E7%9A%84.md)
1. [比原是如何通过`/list-balances`显示帐户余额的？](https://github.com/freewind/bytom.win/blob/master/113.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E6%98%BE%E7%A4%BA%E5%B8%90%E6%88%B7%E4%BD%99%E9%A2%9D%E7%9A%84.md)
1. [比原的挖矿流程是什么的？](https://github.com/freewind/bytom.win/blob/master/114.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E7%9A%84%E6%8C%96%E7%9F%BF%E6%B5%81%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84.md)
1. [比原是如何转帐的？](https://github.com/freewind/bytom.win/blob/master/115.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E8%BD%AC%E5%B8%90%E7%9A%84.md)
1. [比原是如何通过`/list-transactions'显示交易信息的？](https://github.com/freewind/bytom.win/blob/master/116.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E6%98%BE%E7%A4%BA%E4%BA%A4%E6%98%93%E4%BF%A1%E6%81%AF%E7%9A%84.md)
1. [比原是如何显示交易的详细信息的？](https://github.com/freewind/bytom.win/blob/master/117.%E5%89%A5%E5%BC%80%E6%AF%94%E5%8E%9F%E7%9C%8B%E4%BB%A3%E7%A0%81-%E6%AF%94%E5%8E%9F%E6%98%AF%E5%A6%82%E4%BD%95%E6%98%BE%E7%A4%BA%E4%BA%A4%E6%98%93%E7%9A%84%E8%AF%A6%E7%BB%86%E4%BF%A1%E6%81%AF%E7%9A%84.md)

注：由于个人原因，该系列的文章将不再更新，所以很遗憾，我最初的目标“对比原核心代码进行分析”做不到了。对于比原代码的爱好者来说，前面的这些文章应该已经足够支撑到独立对代码进行分析简单的分析了。但是对于比原的核心代码，可能还需要先阅读其它有比较多的资料的区块链（如比特币等），然后再回过头来看可能比较好。


---

如果你觉得这些文章对你非常有用，控制不住想打赏作者，可以有以下选择：

1. 打赏BTM:`0x6bcCfb7265d4aB0C1a71F7d19b9E581cae73D777`
2. BTC：`1Af2Q23Y1kqgtgbryzjS7RxrnEmyvYuX4b`
3. ETH: `0x6bcCfb7265d4aB0C1a71F7d19b9E581cae73D777`

多少请随意，心意最重要，我们一起努力吧！
