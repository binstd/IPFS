---
id: install
title: 安装IPFS
permalink: docs/install.html
---

安装 GO IPFS

我们建议通过安装包的方式对IPFS进行安装：
下载适合你操作系统的IPFS安装包

## 索引

- 通过安装包安装
- 使用iffs-update安装
- 通过编译源码安装
- 升级IPFS
- 快速定位问题

## 通过安装包安装
### **Mac OS X 和 Linux**
当你下载好安装包之后，解压并将ipfs的库文件拷到可执行的路径下，使用install.sh脚本进行安装：

```
tar xvfz go-ipfs.tar.gz
cd go-ipfs
./install.sh
```

测试一下:

```
    >ipfs help
    USAGE:

        ipfs - Global p2p merkle-dag filesystem.
    ...
```
恭喜你！现在你已经成功将IPFS安装在你的电脑上。
[开始使用IPFS](url)

### **Windows**
当你下载好安装包之后，解压并将ipfs.exe拷贝到可执行的路径上。
测试一下
```
>ipfs help
USAGE:
ipfs - Global p2p merkle-dag filesystem.
...
```
恭喜你！现在你已经成功将IPFS安装在你的电脑上。
[开始使用IPFS](url)

## 通过ipfs-update安装
ipfs-update 是一个命令行工具，用来安装与升级ipfs库文件。

### 下载ipfs-update
可以在[https://dist.ipfs.io/#ipfs-update](https://dist.ipfs.io/#ipfs-update)下载到适合你操作系统的ipfs-update
如果你拥有Go环境（>=1.8）,你也可以通过命令来安装:

`go get -u github.com/ipfs/ipfs-update`

当你安装新版本的`ipfs`或者是升级旧版本`ipfs`的时候，请确认使用的是最新版本`的ipfs-update`。

### 通过ipfs-update来安装ipfs
`ipfs-update versions` 列出所有可以使用和可以下载的`ipfs`版本。

```
$ ipfs-update versions
v0.3.2
v0.3.4
v0.3.5
v0.3.6
v0.3.7
v0.3.8
v0.3.9
v0.3.10
v0.3.11
v0.4.0
v0.4.1
v0.4.2
v0.4.3
v0.4.4
v0.4.5
v0.4.6
v0.4.7-rc1
```
`ipfs-update install latest` 安装最新的可用版本：

```
$ ipfs-update install latest
fetching go-ipfs version v0.4.7-rc1
binary downloaded, verifying...
success!
stashing old binary
installing new binary to /home/hector/go/bin/ipfs
checking if repo migration is needed...
Installation complete!
```
值得注意的是最新版本可能会存在稳定性问题（例如：发布候选列表里带有vX.X.X-rcX格式的）。所以建议指定版本进行安装，例如：`ipfs-update install v0.4.6`。

## 源码安装

> 警告：之前你可以通过使用go get来安装IPFS,但是这种方式今后将不再支持。

如果你愿意的话，你也可以通过源码编译的方式构建IPFS。如果你用的是Mac OS X或者是Linux 可以参考[readme](url)安装指南。如果你是Windows，请参考[这份操作文档](url)。

## 升级IPFS
`ipfs`升级（或者降级）会涉及到仓库的升级，通过使用[fs-repo-migrations](url)工具。

### 使用ipfs-update升级
当你需要时安装最新或者历史版本的时候（正如文章之前提到过），使用`ipfs-update install`会下载并执行`fs-repo-migrations`。这是最新简单的升级方式。

> 警告：请确认在升级过程中，先停止正在运行的ipfs进程

### 手动升级
为了能够手动升级`ipfs`，你将需要手动的执行所有的仓库迁移。步骤如下：

- 确认`ipfs`进程是否被关闭
- (可选)备份你的`ipfs`数据文件夹（例如：cp -aL ~/.ipfs ~/.ipfs.bk）
- 下载并安装最新版本的`ipfs`，[](https://dist.ipfs.io/#go-ipfs)
- 执行`ipfs daemon`命令

当一个知识仓库需要被迁移，`ipfs`会通知到用户下载并安装`fs-repo-migrations`来执行升级。如果你希望自动完成这些步骤，请在开启进程时，带上--migrate的参数。

仓库迁移也可以手动执行，下载使用最新版本的`fs-repo-migrations`工具,下载地址[](https://dist.ipfs.io/#fs-repo-migrations)与[操作指南](url)。

## 快速定位问题
### 帮助！
如果你遇到任何问题，可以在这里得到帮助[#ipfs](url)或者`邮件列表`

### 检测Go的版本
IPFS需要Go 1.7.0或更高版本。检测你所安装的Go版本，使用go version。下面是我的执行结果。

```
> go version
go version go1.7 linux/amd64
```
如果你需要更新，建议从[https://golang.org/doc/install](https://golang.org/doc/install)下载。安装包管理器通常会包含历史的Go安装包。

### 安装 FUSE
想要了解更多关于如何设置FUSE（让你能够挂载文件系统），参考[github.com/ipfs/go-ipfs/blob/master/docs/fuse.md](github.com/ipfs/go-ipfs/blob/master/docs/fuse.md)


---

Tip
打赏

译者 [zian](https://www.binstd.com/u/zian)

ETH: `0xAf1c0a63Ade4b56e262849235e49D87742C56af4`

校对 [qaeasy](https://www.binstd.com/u/qaeasy)

ETH: `0x7CdaF81D544E2a3bd993e639D1a4d6785067cB24`

站长 [cho](https://www.binstd.com/u/cho)

1. BTC: `1Af2Q23Y1kqgtgbryzjS7RxrnEmyvYuX4b`
2. ETH: `0x6bcCfb7265d4aB0C1a71F7d19b9E581cae73D777`