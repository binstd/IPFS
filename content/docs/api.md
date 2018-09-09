---
id: api
title: API参考文档
permalink: docs/api.html
---

> 本文档基于 go-ipfs v0.4.11-dev 版本，发布于2017年8月23日。

这是一篇关于 IPFS 的 HTTP API 说明。

IPFS HTTP API 是一种 RPC API 接口，在不同的IPFS实现之间都能工作。本说明文档所对应的开源库实现为 [go-ipfs](https://github.com/ipfs/go-ipfs)，这也是目前功能最完备的实现。

本文档由 go-ipfs 自动生成。如有问题或需要帮助，请查看 GitHub 上的 [ipfs-http-api-docs](https://github.com/ipfs/http-api-docs) 库。

## 入门指南

### 符合 CLI 命令行界面

命令行界面（CLI）所有可用的 [命令行](https://ipfs.io/docs/commands/)，都可以使用HTTP API 来访问。例如，

    > ipfs swarm peers
    /ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
    /ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
    /ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z

    > curl http://127.0.0.1:5001/api/v0/swarm/peers
    {
       "Strings": [
    
    "/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
   
    "/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx",
    
    "/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z",
        ]
    }

### 参数 

使用关键字”arg“ 添加参数，该关键字是一种特殊的查询字符串。

    > curl "http://127.0.0.1:5001/api/v0/swarm/disconnect?arg=/ip4/54.93.113.247/
    tcp/48131/ipfs/QmUDS3nsBD1X4XK5Jo836fed7SErTyTuQzRqWaiQAyBYMP"
    {
        "Strings": [
            "disconnect QmUDS3nsBD1X4XK5Jo836fed7SErTyTuQzRqWaiQAyBYMP success",
        ]
    }

注意：“arg”关键字可以多次使用来表示多个参数。

### 标记 

标记通过查询字符串参数添加。例如，'--encoding = json' 标志使用 '&encoding = json' 查询参数表示:

    > curl "http://127.0.0.1:5001/api/v0/object/get?arg=QmaaqrHyAQm7gALkRW8Dcf
    GX3u8q9rWKnxEMmf7m9z515w&encoding=json"
    {
        "Links": [
           {
               "Name": "index.html",
               "Hash": "QmYftndCvcEiuSZRX7njywX2AGSeHY2ASa7VryCq1mKwEw",
               "Size": 1700
           },
           {
               "Name": "static",
               "Hash": "QmdtWFiasJeh2ymW3TD2cLHYxn1ryTuWoNpwieFyJriGTS",
               "Size": 2428803
           }
        ],
        "Data": "CAE="
    }

## 快速索引

* [/add](/docs/api.html#apiv0add)
* [/bitswap/ledger](/docs/api.html#apiv0bitswapledger)
* [/bitswap/reprovide](/docs/api.html#apiv0bitswapreprovide)
* [/bitswap/stat](/docs/api.html#apiv0bitswapstat)
* [/bitswap/unwant](/docs/api.html#apiv0bitswapunwant)
* [/bitswap/wantlist](/docs/api.html#apiv0bitswapwantlist)
* [/block/get](/docs/api.html#apiv0blockget)
* [/block/put](/docs/api.html#apiv0blockput)
* [/block/rm](/docs/api.html#apiv0blockrm)
* [/block/stat](/docs/api.html#apiv0blockstat)
* [/bootstrap/add/default](/docs/api.html#apiv0bootstrapadddefault)
* [/bootstrap/list](/docs/api.html#apiv0bootstraplist)
* [/bootstrap/rm/all](/docs/api.html#apiv0bootstraprmall)
* [/cat](/docs/api.html#apiv0cat)
* [/commands](/docs/api.html#apiv0commands)
* [/config/edit](/docs/api.html#apiv0configedit)
* [/config/replace](/docs/api.html#apiv0configreplace)
* [/config/show](/docs/api.html#apiv0configshow)
* [/dag/get](/docs/api.html#apiv0dagget)
* [/dag/put](/docs/api.html#apiv0dagput)
* [/dag/resolve](/docs/api.html#apiv0dagresolve)
* [/dht/findpeer](/docs/api.html#apiv0dhtfindpeer)
* [/dht/findprovs](/docs/api.html#apiv0dhtfindprovs)
* [/dht/get](/docs/api.html#apiv0dhtget)
* [/dht/provide](/docs/api.html#apiv0dhtprovide)
* [/dht/put](/docs/api.html#apiv0dhtput)
* [/dht/query](/docs/api.html#apiv0dhtquery)
* [/diag/cmds/clear](/docs/api.html#apiv0diagcmdsclear)
* [/diag/cmds/set-time](/docs/api.html#apiv0diagcmdsset-time)
* [/diag/sys](/docs/api.html#apiv0diagsys)
* [/dns](/docs/api.html#apiv0dns)
* [/file/ls](/docs/api.html#apiv0filels)
* [/files/cp](/docs/api.html#apiv0filescp)
* [/files/flush](/docs/api.html#apiv0filesflus)
* [/files/ls](/docs/api.html#apiv0filesls)
* [/files/mkdir](/docs/api.html#apiv0filesmkdir)
* [/files/mv](/docs/api.html#apiv0filesmv)
* [/files/read](/docs/api.html#apiv0filesread)
* [/files/rm](/docs/api.html#apiv0filesrm)
* [/files/stat](/docs/api.html#apiv0filesstat)
* [/files/write](/docs/api.html#apiv0fileswrite)
* [/filestore/dups](/docs/api.html#apiv0filestoredups)
* [/filestore/ls](/docs/api.html#apiv0filestorels)
* [/filestore/verify](/docs/api.html#apiv0filestoreverify)
* [/get](/docs/api.html#apiv0get)
* [/id](/docs/api.html#apiv0id)
* [/key/gen](/docs/api.html#apiv0keygen)
* [/key/list](/docs/api.html#apiv0keylist)
* [/key/rename](/docs/api.html#apiv0keyrename)
* [/key/rm](/docs/api.html#apiv0keyrm)
* [/log/level](/docs/api.html#apiv0loglevel)
* [/log/ls](/docs/api.html#apiv0logls)
* [/log/tail](/docs/api.html#apiv0logtail)
* [/ls](/docs/api.html#apiv0ls)
* [/mount](/docs/api.html#apiv0mount)
* [/name/publish](/docs/api.html#apiv0namepublish)
* [/name/resolve](/docs/api.html#apiv0nameresolve)
* [/object/data](/docs/api.html#apiv0objectdata)
* [/object/diff](/docs/api.html#apiv0objectdiff)
* [/object/get](/docs/api.html#apiv0objectget)
* [/object/links](/docs/api.html#apiv0objectlinks)
* [/object/new](/docs/api.html#apiv0objectnew)
* [/object/patch/add-link](/docs/api.html#apiv0objectpatchadd-link)
* [/object/patch/append-data](/docs/api.html#apiv0objectpatchappend-data)
* [/object/patch/rm-link](/docs/api.html#apiv0objectpatchrm-link)
* [/object/patch/set-data](/docs/api.html#apiv0objectpatchset-data)
* [/object/put](/docs/api.html#apiv0objectput)
* [/object/stat](/docs/api.html#apiv0objectstat)
* [/p2p/listener/close](/docs/api.html#apiv0p2plistenerclose)
* [/p2p/listener/ls](/docs/api.html#apiv0p2plistenerls)
* [/p2p/listener/open](/docs/api.html#apiv0p2plisteneropen)
* [/p2p/stream/close](/docs/api.html#apiv0p2pstreamclose)
* [/p2p/stream/dial](/docs/api.html#apiv0p2pstreamdial)
* [/p2p/stream/ls](/docs/api.html#apiv0p2pstreamls)
* [/pin/add](/docs/api.html#apiv0pinadd)
* [/pin/ls](/docs/api.html#apiv0pinls)
* [/pin/rm](/docs/api.html#apiv0pinrm)
* [/pin/update](/docs/api.html#apiv0pinupdate)
* [/pin/verify](/docs/api.html#apiv0pinverify)
* [/ping](/docs/api.html#apiv0ping)
* [/pubsub/ls](/docs/api.html#apiv0pubsubls)
* [/pubsub/peers](/docs/api.html#apiv0pubsubpeers)
* [/pubsub/pub](/docs/api.html#apiv0pubsubpub)
* [/pubsub/sub](/docs/api.html#apiv0pubsubsub)
* [/refs/local](/docs/api.html#apiv0refslocal)
* [/repo/fsck](/docs/api.html#apiv0repofsck)
* [/repo/gc](/docs/api.html#apiv0repogc)
* [/repo/stat](/docs/api.html#apiv0repostat)
* [/repo/verify](/docs/api.html#apiv0repoverify)
* [/repo/version](/docs/api.html#apiv0repoversion)
* [/resolve](/docs/api.html#apiv0resolve)
* [/shutdown](/docs/api.html#apiv0shutdown)
* [/stats/bitswap](/docs/api.html#apiv0statsbitswap)
* [/stats/bw](/docs/api.html#apiv0statsbw)
* [/stats/repo](/docs/api.html#apiv0statsrepo)
* [/swarm/addrs/listen](/docs/api.html#apiv0swarmaddrslisten)
* [/swarm/addrs/local](/docs/api.html#apiv0swarmaddrslocal)
* [/swarm/connect](/docs/api.html#apiv0swarmconnect)
* [/swarm/disconnect](/docs/api.html#apiv0swarmdisconnect)
* [/swarm/filters/add](/docs/api.html#apiv0swarmfiltersadd)
* [/swarm/filters/rm](/docs/api.html#apiv0swarmfiltersrm)
* [/swarm/peers](/docs/api.html#apiv0swarmpeers)
* [/tar/add](/docs/api.html#apiv0taradd)
* [/tar/cat](/docs/api.html#apiv0tarcat)
* [/update](/docs/api.html#apiv0update)
* [/version](/docs/api.html#apiv0version)

## 路径列表

### /api/v0/add

向 ipfs 添加文件或目录。

#### 参数 

* arg [file]: 待添加到 ipfs 的文件路径。是否必要: **是**。
* recursive [bool]: 是否递归添加目录路径。默认: 否。是否必要: 否。
* quiet [bool]: 是否最小输出。 是否必要: 否。
* quieter [bool]: 是否只写入哈希值。是否必要: 否。
* silent [bool]: 是否不输出。是否必要: 否。
* progress [bool]: Stream progress data. 是否必要: 否。
* trickle [bool]: 是否使用 trickle-dag 格式算法生成DAG。是否必要: 否。
* only-hash [bool]: 是否仅仅出块和hash，不写入磁盘。是否必要: 否。
* wrap-with-directory [bool]:  是否使用目录对象来包装文件。是否必要: 否。
* hidden [bool]: 是否添加隐藏文件，只有在递归的时候才有用。是否必要: 否。
* chunker [string]: 使用的成块算法。是否必要: 否。
* pin [bool]: 是否在添加的时候持久化 (不被垃圾回收所回收)。默认：否。是否必要: 否。
* raw-leaves [bool]: 实验中的参数。是否为叶子节点使用原始块。是否必要: 否。
* nocopy [bool]: 实验中的参数。是否使用filestore存储文件。是否必要: 否。
* fscache [bool]: 实验中的参数。检测filestore是否已经存在了数据块。是否必要: 否。
* cid-version [int]: 实验中的参数。返回 Cid 版本。非零值将把 ‘raw-leaves’ 的默认值变为真。默认：“0”。是否必要: 否。
* hash [string]: 实验中的参数。使用的哈希函数。使用时设置 Cid 值为1。默认: “sha2-256”。是否必要: 否。

#### 请求体 

参数“path”是一种文件类型。这个路径需要在请求主体（body）中有包含一个 ‘multipart/form-data’ 文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Name": "<string>"
        "Hash": "<string>"
        "Bytes": "<int64>"
        "Size": "<string>"
    }

#### cURL 示例

    curl -F file=@myfile 
    "http://localhost:5001/api/v0/add?recursive=false&quiet=<value>&
    quieter=<value>&silent=<value>&progress=<value>&trickle=<value>&
    only-hash=<value>&wrap-with-directory=<value>&hidden=
    <value>&chunker= <value>&pin=true&raw-leaves=<value>&nocopy=
    <value>&fscache=<value>&cid-version=0&hash=sha2-256"

### /api/v0/bitswap/ledger

显示当前节点的账本信息。

#### 参数

* arg [string]: 监测账本的节点ID。是否必要：**是**。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Peer": "<string>"
        "Value": "<float64>"
        "Sent": "<uint64>"
        "Recv": "<uint64>"
        "Exchanged": "<uint64>"
    }


#### cURL 示例

    curl "http://localhost:5001/api/v0/bitswap/ledger?arg=<peer>"

### /api/v0/bitswap/reprovide

触发 reprovider。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/bitswap/reprovide"

### /api/v0/bitswap/stat

展示bitswap代理的诊断信息。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ProvideBufLen": "<int>"
        "Wantlist": [
            "<string>"
        ]
        "Peers": [
            "<string>"
        ]
        "BlocksReceived": "<uint64>"
        "DataReceived": "<uint64>"
        "BlocksSent": "<uint64>"
        "DataSent": "<uint64>"
        "DupBlksReceived": "<uint64>"
        "DupDataReceived": "<uint64>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/bitswap/stat"

### /api/v0/bitswap/unwant

从wantlist中移除给定区块。

#### 参数

* arg [string]: 待移除的值。是否必须：**是**。 

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/bitswap/unwant?arg=<key>"

### /api/v0/bitswap/wantlist

显示wantlist中的当前块列表。

#### 参数

* peer [string]: 需要展示wantlist的结点。是否必须：否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Keys": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/bitswap/wantlist?peer=<value>"

### /api/v0/block/get

获取原始IPFS块。

#### 参数

* arg [string]: 存在区块的base58编码的multihash。是否必须：**是**。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/block/get?arg=<key>"

### /api/v0/block/put

将输入存储为IPFS块。

#### 参数

* arg [file]: 需要被存储为 IPFS 块的数据。是否必须：是。
* format [string]: 所创建块的cid格式。默认: “v0”。是否必须：否。
* mhtype [string]: 返回multihash结构的哈希函数. 默认: “sha2-256”。是否必须：否。
* mhlen [int]: multihash结构的长度。默认: “-1”。是否必须：否。

#### 请求体

参数 “data” 是文件类型。此接口需要请求体‘multipart/form-data’中的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Key": "<string>"
        "Size": "<int>"
    }

#### cURL 示例

        curl -F file=@myfile "http://localhost:5001/api/v0/block/put?
        format=v0&mhtype=sha2-  256&mhlen=-1"

### /api/v0/block/rm

移除IPFS块。

#### 参数

* arg [string]: 将被移除的base58编码的multihash区块。是否必须：是。
* force [bool]: 是否忽略不存在的区块。默认：否。是否必须：否。
* quiet [bool]: 是否最小输出。默认: 否。是否必须：否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Error": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/block/rm?arg=<hash>&force=false&quiet=false"

### /api/v0/block/stat

打印原始IPFS块的信息。

#### 参数

* arg [string]: 当前块的base58 multihash。是否必须：是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Key": "<string>"
        "Size": "<int>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/block/stat?arg=<key>"

### /api/v0/bootstrap/add/default

向bootstrap列表中添加默认peer。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Peers": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/bootstrap/add/default"

### /api/v0/bootstrap/list

显示bootstrap列表中的peers。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Peers": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/bootstrap/list"

### /api/v0/bootstrap/rm/all

移除bootstrap列表中的所有peers。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Peers": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/bootstrap/rm/all"

### /api/v0/cat

显示IPFS的对象数据。

#### 参数A

* arg [string]: The path to the IPFS object(s) to be outputted. Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/cat?arg=<ipfs-path>"

### /api/v0/commands

显示所有有效指令。

#### 参数

* flags [bool]: 是否显示命令标记。默认: 否。是否必须：否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Name": "<string>"
        "Subcommands": [
            {
                "Name": "<string>"
                "Subcommands": [
                    {
                        "Name": "<string>"
                        "Subcommands": [
                            ...
                        ]
                        "Options": [
                            ...
                        ]
                    }
                ]
                "Options": [
                    {
                        "Names": [
                            ...
                        ]
                    }
                 ]
            }
        ]
        "Options": [
            {
                "Names": [
                    "<string>"
                ]
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/commands?flags=false"

### /api/v0/config/edit

在$EDITOR中打开配置文件进行编辑。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/config/edit"

### /api/v0/config/replace

替换配置文件。

#### 参数

* arg [file]: 用作新配置文件的文件。是否必须：是。

#### 请求体

参数"file"是文件类型。此接口需要请求体 ‘multipart/form-data’ 中的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl -F file=@myfile "http://localhost:5001/api/v0/config/replace"

### /api/v0/config/show

输出配置文件内容。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

     This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/config/show"

### /api/v0/dag/get

获取ipfs中的一个dag节点。

#### 参数

* arg [string]: 要获取的对象节点。是否必须：是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/dag/get?arg=<ref>"

### /api/v0/dag/put

向ipfs中添加一个dag节点。

#### 参数

* arg [file]: 要放入的节点对象。是否必须：是。
* format [string]: 将需要添加的对象转化为指定格式。默认: “cbor”。是否必须：否。
* input-enc [string]: 将输入对象转化为指定格式。默认: “json”。是否必须：否。
* pin [bool]: 是否在添加的时候持久化。默认: 否。是否必须：否。
* hash [string]: 使用的哈希函数。默认: “sha2-256”。是否必要: 否。

#### 请求体

参数'object data'是文件类型。此接口需要请求体‘multipart/form-data’中的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Cid": "<string>"
    }

#### cURL 示例

    curl -F file=@myfile "http://localhost:5001/api/v0/dag/put?
    format=cbor&input-enc=json&pin=false&hash=<value>"

### /api/v0/dag/resolve

解析ipId块。

#### 参数

* arg [string]: 需要解析的路径。是否必须: 是。 

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Cid": "<string>"
        "RemPath": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dag/resolve?arg=<ref>"

### /api/v0/dht/findpeer

查询和节点ID相关联的多地址的所有DHT信息。

#### 参数

* arg [string]: 需要查询的节点ID。是否必须: 是。
* verbose [bool]: 是否输出其他信息。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ID": "<string>"
        "Type": "<int>"
        "Responses": [
            {
                "ID": "<string>"
                "Addrs": [
                    "<object>"
                ]
            }
        ]
        "Extra": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dht/findpeer?arg=<peerID>&verbose=false"

### /api/v0/dht/findprovs

在DHT网络中找到有指定值的节点。

#### 参数

* arg [string]: 有指定值的节点的键。是否必须: 是。
* verbose [bool]: 是否输出其他信息。默认: 否。是否必须: 否。
* num-providers [int]: 有指定值的节点数量。默认: 20。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ID": "<string>"
        "Type": "<int>"
        "Responses": [
            {
                "ID": "<string>"
                "Addrs": [
                    "<object>"
                ]
            }
        ]
        "Extra": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dht/findprovs?arg=<key>&
    verbose=false&num-providers=20"

### /api/v0/dht/get

给定一个键，在DHT表中查询最佳值。

#### 参数

* arg [string]: 需要查询值的键。是否必须: **是**。
* verbose [bool]: 是否输出其他信息。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ID": "<string>"
        "Type": "<int>"
        "Responses": [
            {
                "ID": "<string>"
                "Addrs": [
                    "<object>"
                ]
            }
        ]
        "Extra": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dht/get?arg=<key>&verbose=false"

### /api/v0/dht/provide

向网络宣布正在提供给定的值。

#### 参数

* arg [string]: 需要接受记录的所有节点的键。是否必须: 是。
* verbose [bool]: 是否输出其他信息。默认: 否。是否必须: 否。
* recursive [bool]:  是否递归添加目录路径。是否输出其他信息。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ID": "<string>"
        "Type": "<int>"
        "Responses": [
            {
                "ID": "<string>"
                "Addrs": [
                     "<object>"
                ]
            }
        ]
        "Extra": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dht/provide?arg=<key>&verbose=false&recursive=false"

### /api/v0/dht/put

往DHT网络中写入key-value值。

#### 参数

* arg [string]: 存取特定值的节点的键。是否必须: 是。
* arg [string]: 要存储的值。是否必须: 是。
* verbose [bool]: 是否输出其他信息。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ID": "<string>"
        "Type": "<int>"
        "Responses": [
            {
                "ID": "<string>"
                "Addrs": [
                    "<object>"
                ]
            }
        ]
        "Extra": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dht/put?arg=<key>&arg=<value>&verbose=false"

### /api/v0/dht/query

通过查询DHT网络找到与给定节点最近的节点。

#### 参数

* arg [string]: 针对此次查询的节点 ID。是否必须: 是。
* verbose [bool]: 是否输出其他信息。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ID": "<string>"
        "Type": "<int>"
        "Responses": [
            {
                "ID": "<string>"
                "Addrs": [
                    "<object>"
                ]
            }
        ]
        "Extra": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dht/query?arg=<peerID>&verbose=false"

### /api/v0/diag/cmds/clear

从日志中清除失效请求。

### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/diag/cmds/clear"

### /api/v0/diag/cmds/set-time

设置在日志中保存失效请求的时间。

#### 参数

* arg [string]: 在日志中保存失效请求的时间。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

     This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/diag/cmds/set-time?arg=<time>"

### /api/v0/diag/sys

打印系统诊断信息。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/diag/sys"

### /api/v0/dns

解析DNS链接。

#### 参数

* arg [string]: 需要解析的域名。是否必须: 是。
* recursive [bool]:  是否递进解析，终止条件为解析结果不是 DNS 链接。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Path": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dns?arg=<domain-name>&recursive=false"

### /api/v0/file/ls

列出Unix文件系统对象的目录内容。

#### 参数

* arg [string]: 所列出 ipfs 对象的路径。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Arguments": {
            "<string>": "<string>"
        }
        "Objects": {
            "<string>": {
                "Hash": "<string>"
                "Size": "<uint64>"
                "Type": "<string>"
                "Links": [
                    {
                        "Name": "<string>"
                        "Hash": "<string>"
                        "Size": "<uint64>"
                        "Type": "<string>"
                    }
                ]
            }
        }
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/file/ls?arg=<ipfs-path>"

### /api/v0/files/cp

复制文件到mfs。

#### 参数

* arg [string]: 要复制的源对象。是否必须: 是。
* arg [string]: 复制的目的地。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/cp?arg=<source>&arg=<dest>"

### /api/v0/files/flush

将给定路径的数据刷新到磁盘。

#### 参数

* arg [string]: 落盘路径。默认: ‘/’。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/flush?arg=<path>"

### /api/v0/files/ls

列出本地可变命名空间中的目录。

#### 参数

* arg [string]: 显示列表的路径。默认: ‘/’。是否必须: 否。
* l [bool]: 是否使用长列表格式。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Entries": [
            {
                "Name": "<string>"
                "Type": "<int>"
                "Size": "<int64>"
                "Hash": "<string>"
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/ls?arg=<path>&l=<value>"

### /api/v0/files/mkdir

创建目录。

#### 参数

* arg [string]: 创建目录的路径。是否必须: 是。
* parents [bool]: 如果存在父目录，是否显示 No error；否则，是否创建父目录。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/mkdir?arg=<path>&parents=<value>"

### /api/v0/files/mv

移动文件。

#### 参数

* arg [string]: 需要移动的源文件。是否必须: 是。
* arg [string]: 文件拷贝到的目标路径。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/mv?arg=<source>&arg=<dest>"

### /api/v0/files/read

读取给定mfs中的文件。

#### 参数

* arg [string]: 需要读取的文件的路径。是否必须: 是。
* offset [int]: 读取处的字节偏移量。是否必须: 否。
* count [int]: 读取的字节数量最大值。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/read?arg=<path>&offset=<value>&count=<value>"

### /api/v0/files/rm

移除文件。

#### 参数

* arg [string]: 需要移除的文件。是否必须: 是。
* recursive [bool]: 是否递归地移除目录。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/rm?arg=<path>&recursive=<value>"

### /api/v0/files/stat

显示文件状态。

#### 参数

* arg [string]: 需要显示状态的节点的路径。是否必须: 是。
* format [string]: 以给定格式输出文件状态。支持的符号: .。不支持其他格式。默认: Size: CumulativeSize: ChildBlocks: Type: 。默认: “ Size: CumulativeSize: ChildBlocks: Type: ”。是否必须: 否。
* hash [bool]: 是否只输出哈希值。指示 ‘–format=’。不支持其他格式。默认: 否。是否必须: 否。
* size [bool]: 是否只输出大小。指示 ‘–format=’。不支持其他格式。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Size": "<uint64>"
        "CumulativeSize": "<uint64>"
        "Blocks": "<int>"
        "Type": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/stat?arg=<path>&format=<hash> 
    Size: <size>  CumulativeSize:  <cumulsize> ChildBlocks: <childs> 
    Type: <type>&hash=false&size=false"

### /api/v0/files/write

写入给定文件系统中的可变文件。

#### 参数

* arg [string]: 写入路径。是否必须: 是。
* arg [file]: 需要写入的数据。是否必须: 是。
* offset [int]: 开始写入处的字节偏移量。是否必须: 否。
* create [bool]: 如果文件不存在，是否创建文件。是否必须: 否。
* truncate [bool]: 写入之前是否把文件长度截断为零。是否必须: 否。
* count [int]: 读取字节的长度最大值。是否必须: 否。

#### 请求体

参数'data'是文件类型。此接口需要请求体‘multipart/form-data’中的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl -F file=@myfile "http://localhost:5001/api/v0/files/write?arg=<path>&
    offset=<value>&create=<value>&truncate=<value>&count=<value>"

### /api/v0/filestore/dups

列出filestore和标准块存储中的块。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Ref": "<string>"
        "Err": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/filestore/dups"

### /api/v0/filestore/ls

列出filestore中的对象列表。

#### 参数

* arg [string]: 需要列出的对象的Cid。是否必须: 否。
* file-order [bool]: 是否根据备份文件的路径顺序对结果进行排序。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Status": "<int32>"
        "ErrorMsg": "<string>"
        "Key": "<string>"
        "FilePath": "<string>"
        "Offset": "<uint64>"
        "Size": "<uint64>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/filestore/ls?arg=<obj>&file-order=<value>"

### /api/v0/filestore/verify

验证filestore中的对象。

#### 参数

* arg [string]: 待验证的对象的Cid。是否必须: 否。
* file-order [bool]: 是否根据备份文件的路径顺序对结果进行验证。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Status": "<int32>"
        "ErrorMsg": "<string>"
        "Key": "<string>"
        "FilePath": "<string>"
        "Offset": "<uint64>"
        "Size": "<uint64>"
   }

#### cURL 示例

     curl "http://localhost:5001/api/v0/filestore/verify?arg=<obj>&file-order=<value>"

### /api/v0/get

下载IPFS对象。

#### 参数

* arg [string]: 接收输出结果的IPFS 对象的路径。是否必须: 是。
* output [string]: 存储输出结果的路径。是否必须: 否。
* archive [bool]: 是否输出一个 TAR 压缩包。默认: 否。是否必须: 否。
* compress [bool]: 是否使用 GZIP 压缩法对输出进行压缩。 默认: 否。是否必须: 否。
* compression-level [int]: 压缩等级 (1-9). 默认: “-1”。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/get?arg=<ipfs-path>&output= <value>&archive=false&compress=false&compression-level=-1"

### /api/v0/id

显示ipfs节点id。

#### 参数

* arg [string]: 需要查询的节点的 ID。是否必须: 否。
* format [string]: 备选的输出格式。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ID": "<string>"
        "PublicKey": "<string>"
        "Addresses": [
            "<string>"
        ]
        "AgentVersion": "<string>"
        "ProtocolVersion": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/id?arg=<peerid>&format=<value>"

### /api/v0/key/gen

创建一个新的键值对。

#### 参数

* arg [string]: 新建键的名字。是否必须: 是。
* type [string]: 新建键的类型 [rsa, ed25519]。是否必须: 否。
* size [int]: 新建键的长度。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Name": "<string>"
        "Id": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/key/gen?arg=<name>&type=<value>&size=<value>"

### /api/v0/key/list

显示本地所有键值对。

#### 参数

* l [bool]: 是否显示键的其他信息。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Keys": [
            {
                "Name": "<string>"
                "Id": "<string>"
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/key/list?l=<value>"

### /api/v0/key/rename

重命名一个键值对。

#### 参数

* arg [string]: 需要重命名的键现在的名字。是否必须: 是。
* arg [string]: 键的新名字。是否必须: 是。
* force [bool]: 是否允许覆盖存在的键。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Was": "<string>"
        "Now": "<string>"
        "Id": "<string>"
        "Overwrite": "<bool>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/key/rename?arg=<name>&arg=<newName>&force=<value>"

### /api/v0/key/rm

移除一个键值对。

#### 参数

* arg [string]: 待移除的键的名字。是否必须: 是。
* l [bool]: 是否显示键的其他信息。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Keys": [
            {
                "Name": "<string>"
                "Id": "<string>"
            }
        ]
    }

#### cURL 示例

     curl "http://localhost:5001/api/v0/key/rm?arg=<name>&l=<value>"

### /api/v0/log/level

修改日志级别。

#### 参数

* arg [string]: 子系统登日志识别符。所有子系统都使用 ‘all’。是否必须: 是。
* arg [string]: 日志级别, 从 debug, info, warning, error 到 critical，其中最冗长的日志标记为 ‘debug'，最短的日志标记为 ‘critical’。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Message": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/log/level?arg=<subsystem>&arg=<level>"

### /api/v0/log/ls

列出日志子系统。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/log/ls"

### /api/v0/log/tail

读取事件日志。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/log/tail"

### /api/v0/ls

列出Unix文件系统对象的目录内容。

#### 参数

* arg [string]: 链接到列表的 IPFS 对象的路径。是否必须: 是。
* headers [bool]: 是否输出表头 (Hash, Size, Name)。默认: 否。是否必须: 否。
* resolve-type [bool]: 是否解析链接的对象来检测其数据类型。默认: 是。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Objects": [
            {
                "Hash": "<string>"
                "Links": [
                    {
                        "Name": "<string>"
                        "Hash": "<string>"
                        "Size": "<uint64>"
                        "Type": "<int32>"
                    }
                ]
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/ls?arg=<ipfs-path>&headers=false&resolve-type=true"

### /api/v0/mount

将IPFS挂载到文件系统(只读)。

#### 参数

* ipfs-path [string]: IPFS 挂载路径。是否必须: 否。
* ipns-path [string]: IPNS 挂载路径。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "IPFS": "<string>"
        "IPNS": "<string>"
        "FuseAllowOther": "<bool>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/mount?ipfs-path=<value>&ipns-path=<value>"

### /api/v0/name/publish

输出IPNS名录。

#### 参数

* arg [string]: 待输出对象的 ipfs 访问路径。是否必须: 是。
* resolve [bool]: 输出前是否解析给定路径。默认: 是。是否必须: 否。
* lifetime [string]: 记录合理化的时间长度。可接受的长度有 “300s”, “1.5h” 或 “2h45m”。有效的时间单位是 “ns”, “us” (or “µs”), “ms”, “s”, “m”, “h”。默认: “24h”。是否必须: 否。
* ttl [string]: 记录的缓存时间长度。请注意，这是实验参数。是否必须: 否。
* key [string]: ‘ipfs key list -l’ 中所列的待使用键或者有效节点 ID 的名字。默认: “self”。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Name": "<string>"
        "Value": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/name/publish?arg=<ipfs-path>&
    resolve=true&lifetime=24h&ttl=<value>&key=self"

### /api/v0/name/resolve

解析IPNS名字。

#### 参数

* arg [string]: 待解析的 IPNS 名。默认: 你的节点 ID。是否必须: 否。
* recursive [bool]: 当结果是 IPNS 名时是否递归解析。默认: 否。是否必须: 否。
* nocache [bool]: 是否弃用缓存条目。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Path": "<string>"
    }

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/name/resolve?arg=<name>&recursive=false&nocache=false"

### /api/v0/object/data

输出IPFS对象的原始字节。

#### 参数

* arg [string]: 待检索对象的键，格式是 base58 编码的multihash。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

     curl "http://localhost:5001/api/v0/object/data?arg=<key>"

### /api/v0/object/diff

显示两个ipfs对象之间的差异。

#### 参数

* arg [string]: 被比较的对象。是否必须: 是。
* arg [string]: 待比较的对象。是否必须: 是。
* verbose [bool]: 是否输出其他信息。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Changes": [
            {
                "Type": "<int>"
                "Path": "<string>"
                "Before": "<string>"
                "After": "<string>"
            }
        ]
    }

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/object/diff?arg=<obj_a>&arg=<obj_b>&verbose=<value>"

### /api/v0/object/get

获取并序列化DAG节点。

#### 参数

* arg [string]: 待检索对象的键，格式是 base58 编码的multihash。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Links": [
            {
                "Name": "<string>"
                "Hash": "<string>"
                "Size": "<uint64>"
            }
        ]
        "Data": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/object/get?arg=<key>"

### /api/v0/object/links

输出指定对象指向的链接。

#### 参数

* arg [string]: 待检索对象的键，格式是 base58 编码的multihash。是否必须: 是。
* headers [bool]: 打印表头 (Hash, Size, Name)。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Links": [
            {
                "Name": "<string>"
                "Hash": "<string>"
                "Size": "<uint64>"
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/object/links?arg=<key>&headers=false"

### /api/v0/object/new

从ipfs模板创建一个新对象。

#### 参数

* arg [string]: 待用模版。可选。是否必须: 否。 

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Links": [
            {
                "Name": "<string>"
                "Hash": "<string>"
                "Size": "<uint64>"
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/object/new?arg=<template>"

### /api/v0/object/patch/add-link

向给定对象添加链接。

#### 参数

* arg [string]: 待调整节点的哈希值。是否必须: 是。
* arg [string]: 新建连接的名字。是否必须: 是。
* arg [string]: 需要添加连接的 IPFS 对象。是否必须: 是。
* create [bool]: 是否创建中间节点。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Links": [
            {
                "Name": "<string>"
                "Hash": "<string>"
                "Size": "<uint64>"
            }
        ]
    }

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/object/patch/add-link?arg=
    <root>&arg=<name>&arg=<ref>&create=false"

### /api/v0/object/patch/append-data

将数据追加到dag节点的数据段。

#### 参数

* arg [string]: 待调整节点的哈希值。是否必须: 是。
* arg [file]: 待追加数据。是否必须: 是。

#### 请求体

参数‘data’是文件类型。该接口需要请求体'multipart/form-data'的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

{
    "Hash": "<string>"
    "Links": [
        {
            "Name": "<string>"
            "Hash": "<string>"
            "Size": "<uint64>"
        }
    ]
}

#### cURL 示例

    curl -F file=
    @myfile "http://localhost:5001/api/v0/object/patch/append-data?arg=<root>"

### /api/v0/object/patch/rm-link

从对象中删除链接。

#### 参数

* arg [string]: 待调整节点的哈希值。是否必须: 是。
* arg [string]: 待移除连接的名字。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Links": [
            {
                "Name": "<string>"
                "Hash": "<string>"
                "Size": "<uint64>"
            }
        ]
    }

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/object/patch/rm-link?arg=<root>&arg=<link>"

### /api/v0/object/patch/set-data

设置IPFS对象的数据字段。

#### 参数

* arg [string]: 待调整节点的哈希值。是否必须: 是。
* arg [file]: 待设置对象的数据字段。是否必须: 是。

#### 请求体

参数‘data’是文件类型。该接口需要请求体'multipart/form-data'的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Links": [
            {
                "Name": "<string>"
                "Hash": "<string>"
                "Size": "<uint64>"
            }
        ]
    }

#### cURL 示例

    curl -F file=
    @myfile "http://localhost:5001/api/v0/object/patch/set-data?arg=<root>"

### /api/v0/object/put

将输入存储为DAG对象，打印其键。

#### 参数

* arg [file]: 需要被存储为 DAG 对象的数据。是否必须: 是。
* inputenc [string]: 输入数据的编码类型，包括 “protobuf”和 “json”。默认: “json”。是否必须: 否。
* datafieldenc [string]: 数据域的编码类型，包括 “text” 和 “base64”。默认: “text”。是否必须: 否。
* pin [bool]: 在添加对象时是否对其进行本地持久化存储。默认: 否。是否必须: 否。

#### 请求体

参数 'data' 是文件类型。该接口需要请求体 ‘multipart/form-data’ 的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "Links": [
            {
                "Name": "<string>"
                "Hash": "<string>"
                "Size": "<uint64>"
            }
        ]
    }

#### cURL 示例

    curl -F file=@myfile "http://localhost:5001/api/v0/object/
    put?inputenc=json&datafieldenc=text&pin=false"

### /api/v0/object/stat

获取DAG节点的信息。

#### 参数

* arg [string]: 检索对象的键，格式是 base58 编码的 multihash。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Hash": "<string>"
        "NumLinks": "<int>"
        "BlockSize": "<int>"
        "LinksSize": "<int>"
        "DataSize": "<int>"
        "CumulativeSize": "<int>"
    }

#### cURL 示例

     curl "http://localhost:5001/api/v0/object/stat?arg=<key>"

### /api/v0/p2p/listener/close

关闭p2p listener。

#### 参数

* arg [string]: P2P 监听协议。是否必须: 否。 Required: no.
* all [bool]: 是否关闭所有监听。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/p2p/listener/close?arg=<Protocol>&all=false"

### /api/v0/p2p/listener/ls

列举活跃的p2p 监听。

#### 参数

* headers [bool]: 打印表头 (HandlerID, Protocol, Local, Remote)。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Listeners": [
            {
                "Protocol": "<string>"
                "Address": "<string>"
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/p2p/listener/ls?headers=false"

### /api/v0/p2p/listener/open

将p2p连接转发到网络多地址。

#### 参数

* arg [string]: 协议标示符。是否必须: 是。
* arg [string]: 请求处理的程序地址。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/p2p/listener/open?arg=<Protocol>&arg=<Address>"

### /api/v0/p2p/stream/close

关闭活跃的p2p流。

#### 参数

* arg [string]: 流的 HandlerID。是否必须: 否。 
* all [bool]: 是否关闭所有流。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/p2p/stream/close?arg=<HandlerID>&all=false"

### /api/v0/p2p/stream/dial

拨号到p2p Listener。

#### 参数

* arg [string]: 需要连接的远端节点。是否必须: 是。
* arg [string]: 协议标示符。是否必须: 是。
* arg [string]: 连接监听地址。默认: /ip4/127.0.0.1/tcp/0)。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/p2p/stream/dial?arg=<Peer>&arg=<Protocol>&arg=<BindAddress>"

### /api/v0/p2p/stream/ls

列出活跃的p2p流。

#### 参数

* headers [bool]: 打印表头 (HagndlerID, Protocol, Local, Remote)。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Streams": [
            {
                "HandlerID": "<string>"
                "Protocol": "<string>"
                "LocalPeer": "<string>"
                "LocalAddress": "<string>"
                "RemotePeer": "<string>"
                "RemoteAddress": "<string>"
            }
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/p2p/stream/ls?headers=false"

### /api/v0/pin/add

将对象固定到本地存储。

#### 参数

* arg [string]: 发送回显信息的对象的访问路径。 是否必须: 是。
* recursive [bool]: 是否递归地本地持久化与指定对象连接的对象。默认: 是。是否必须: 否。
* progress [bool]: 是否打印进程。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Pins": [
            "<string>"
        ]
        "Progress": "<int>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/pin/add?arg=<ipfs-path>&
    recursive=true&progress=<value>"

### /api/v0/pin/ls

列出固定到本地存储的对象。

#### 参数

* arg [string]: 待列出的对象的访问路径。是否必须: 否。
* type [string]: 待列出的本地持久化键的类型，包括 “direct”, “indirect”, “recursive”, 和 “all”。默认: “all”。是否必须: 否。 
* quiet [bool]: 是否仅输出对象的哈希值。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Keys": {
            "<string>": {
                "Type": "<string>"
            }
        }
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/pin/ls?arg=<ipfs-path>&type=all&quiet=false"

### /api/v0/pin/rm

从本地存储中删除固定对象。

#### 参数

* arg [string]: 要删除的对象的访问路径。是否必须: 是。
* recursive [bool]: 是否递归删除与固定对象相连的对象。默认: 是。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Pins": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/pin/rm?arg=<ipfs-path>&recursive=true"

### /api/v0/pin/update

更新一个recursive pin。

#### 参数

* arg [string]: 旧对象路径。是否必须: 是。
* arg [string]: 需要本地持久化的对象的访问路径。是否必须: 是。
* unpin [bool]: 删除旧的本地持久化对象。默认: 是。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Pins": [
            "<string>"
        ]
    }

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/pin/update?arg=<from-path>&arg=<to-path>&unpin=true"

### /api/v0/pin/verify

验证递归pins是否完成。

#### 参数

* verbose [bool]: 是否输出连续本地持久化对象的哈希值。是否必须: 否。
* quiet [bool]: 是否仅输出非连续本地持久化对象的哈希值。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Cid": "<string>"
        "PinStatus": {
            "Ok": "<bool>"
            "BadNodes": [
                {
                    "Cid": "<string>"
                    "Err": "<string>"
                }
            ]
        }
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/pin/verify?verbose=<value>&quiet=<value>"

### /api/v0/ping

向IPFS主机发送echo请求包。

#### 参数

* arg [string]: 需要本地持久化的节点 ID。是否必须: **是**。
* count [int]: 需要本地持久化节点的数量。默认: “10”。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Success": "<bool>"
        "Time": "<int64>"
        "Text": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/ping?arg=<peer ID>&count=10"

### /api/v0/pubsub/ls

按名称列出订阅的主题。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/pubsub/ls"

### /api/v0/pubsub/peers

列出我们现在正在连接的节点。

#### 参数

* arg [string]: 链接的节点列表的主题。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

     curl "http://localhost:5001/api/v0/pubsub/peers?arg=<topic>"

### /api/v0/pubsub/pub

将消息发布到给定的pubsub主题。

#### 参数

* arg [string]: 待发布的主题。是否必须: 是。
* arg [string]: 待发布消息的负载。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/pubsub/pub?arg=<topic>&arg=<data>"

### /api/v0/pubsub/sub

订阅关于给定主题的消息。

#### 参数

* arg [string]: 要订阅的主题的字符串名。是否必须: 是。
* discover [bool]: 是否查找订阅了相同主题的节点。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Message": {
            "From": [
                "<uint8>"
            ]
            "Data": [
                "<uint8>"
            ]
            "Seqno": [
                 "<uint8>"
            ]
            "TopicIDs": [
                 "<string>"
            ]
            "XXX_unrecognized": [
                "<uint8>"
            ]
        }
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/pubsub/sub?arg=<topic>&discover=<value>"

### /api/v0/refs/local

列出所有本地引用。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Ref": "<string>"
        "Err": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/refs/local"

### /api/v0/repo/fsck

移除repo锁文件。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Message": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/repo/fsck"

### /api/v0/repo/gc

对repo执行强制垃圾回收。

#### 参数

* quiet [bool]: 显示最小输出。默认: 否。是否必须: 否。
* stream-errors [bool]: 是否输出 Stream 错误。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Key": "<string>"
        "Error": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/repo/gc?quiet=false&stream-errors=false"

### /api/v0/repo/stat

获取当前repo的状态信息。

#### 参数

* human [bool]: 是否以 MiB为单位输出 RepoSize。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "NumObjects": "<uint64>"
        "RepoSize": "<uint64>"
        "RepoPath": "<string>"
        "Version": "<string>"
        "StorageMax": "<uint64>"
    }

### cURL 示例

     curl "http://localhost:5001/api/v0/repo/stat?human=false"

### /api/v0/repo/verify

验证repo中的所有块是否损坏。

#### 参数

此接口不需要传入参数。

### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Message": "<string>"
        "Progress": "<int>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/repo/verify"

### /api/v0/repo/version

显示当前repo版本。

#### 参数

* quiet [bool]: 是否显示最小输出。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Version": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/repo/version?quiet=<value>"

### /api/v0/resolve

将名称的值解析为IPFS。

#### 参数

* arg [string]: 待解析的名字。是否必须: 是。
* recursive [bool]: 如果结果是 IPFS 名字，是否递归解析。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Path": "<string>"
    }

#### cURL 示例

     curl "http://localhost:5001/api/v0/resolve?arg=<name>&recursive=false"

### /api/v0/shutdown

关闭ipfs守护进程。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

     This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/shutdown"

### /api/v0/stats/bitswap

显示一些关于位交换代理的诊断信息。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "ProvideBufLen": "<int>"
        "Wantlist": [
            "<string>"
        ]
        "Peers": [
            "<string>"
        ]
        "BlocksReceived": "<uint64>"
        "DataReceived": "<uint64>"
        "BlocksSent": "<uint64>"
        "DataSent": "<uint64>"
        "DupBlksReceived": "<uint64>"
        "DupDataReceived": "<uint64>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/stats/bitswap"

### /api/v0/stats/bw

打印ipfs带宽信息。

#### 参数

* peer [string]: 指定需要打印带宽的节点。是否必须: 否。
* proto [string]: 指定需要打印带宽的协议。是否必须: 否。
* poll [bool]: 是否每隔一段时间打印带宽。默认: 否。是否必须: 否。
* interval [string]: 打印的时间间隔。
   
可以接受如“300s”, “1.5h” 或 “2h45m” 的时间区间。有效的时间单位是: “ns”, “us” (or “µs”), “ms”, “s”, “m”, “h”。 缺省: “1s”。是否必须：否。 

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "TotalIn": "<int64>"
        "TotalOut": "<int64>"
        "RateIn": "<float64>"
        "RateOut": "<float64>"
    }

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/stats/bw?peer=<value>&proto=<value>&poll=false&interval=1s"

### /api/v0/stats/repo

获取当前repo的状态。

#### 参数

* human [bool]: 是否输出 RepoSize，以 MiB 为单位。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "NumObjects": "<uint64>"
        "RepoSize": "<uint64>"
        "RepoPath": "<string>"
        "Version": "<string>"
        "StorageMax": "<uint64>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/stats/repo?human=false"

### /api/v0/swarm/addrs/listen

监听地址列表界面。

#### 参数

此接口不需要传入参数。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/swarm/addrs/listen"

### /api/v0/swarm/addrs/local

本地地址列表。

#### 参数

* id [bool]: 是否显示地址列表中的节点 ID。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/swarm/addrs/local?id=false"

### /api/v0/swarm/connect

打开与给定地址的连接。

#### 参数

* arg [string]: 需要连接的节点的地址。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/swarm/connect?arg=<address>"

### /api/v0/swarm/disconnect

关闭与给定地址的连接。

#### 参数

* arg [string]: 需要关闭连接的节点地址。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/swarm/disconnect?arg=<address>"

### /api/v0/swarm/filters/add

添加一个地址过滤器。

#### 参数

* arg [string]: 需要添加的地址过滤器。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/swarm/filters/add?arg=<address>"

### /api/v0/swarm/filters/rm

删除一个地址过滤器。

#### 参数

* arg [string]: 需要删除的地址过滤器。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Strings": [
            "<string>"
        ]
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/swarm/filters/rm?arg=<address>"

### /api/v0/swarm/peers

列出具有活跃连接的peers。

#### 参数

* verbose [bool]: 是否展示全部信息。是否必须: 否。
* streams [bool]: 是否列出每个节点的开源流信息。是否必须: 否。
* latency [bool]: 是否列出每个节点的延迟时间信息。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Peers": [
            {
                "Addr": "<string>"
                "Peer": "<string>"
                "Latency": "<string>"
                "Muxer": "<string>"
                "Streams": [
                    {
                        "Protocol": "<string>"
                    }
                ]
            }
        ]
    }

#### cURL 示例

     curl 
     "http://localhost:5001/api/v0/swarm/peers?verbose=<value>
     &streams=<value>&latency=<value>"

### /api/v0/tar/add

将tar文件导入ipfs。

#### 参数

* arg [file]: 需要添加的 Tar 文件。是否必须: 是。

#### 请求体

参数 ‘file’ 是文件类型。此接口需要请求体 ‘multipart/form-data’ 的文件。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Name": "<string>"
        "Hash": "<string>"
        "Bytes": "<int64>"
        "Size": "<string>"
    }

#### cURL 示例

    curl -F file=@myfile "http://localhost:5001/api/v0/tar/add"

### /api/v0/tar/cat

从IPFS导出tar文件。

#### 参数

* arg [string]: tar文件的 ipfs 导出路径。是否必须: 是。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/tar/cat?arg=<path>"

### /api/v0/update

#### 参数

* arg [string]: 子命令的参数。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/update?arg=<args>"

### /api/v0/version

获取ipfs版本信息。

#### 参数

* number [bool]: 是否只显示版本号。默认: 否。是否必须: 否。
* commit [bool]: 是否显示 commit hash。默认: 否。是否必须: 否。
* repo [bool]: 是否显示仓储版本。默认: 否。是否必须: 否。
* all [bool]: 是否显示所有的版本信息。默认: 否。是否必须: 否。

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Version": "<string>"
        "Commit": "<string>"
        "Repo": "<string>"
        "System": "<string>"
        "Golang": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/version?number=false&commit=false&repo=false&all=false"

# 写在最后

##### IPFS 日志

> 2018年7月29日
 [js-ipfs 0.31.0](https://ipfs.io/blog/42-js-ipfs-0-31/) 发布

> 2018年7月27日 
 [js-libp2p 0.23.0](https://ipfs.io/blog/41-js-libp2p-0-23/) 发布

> 2018年7月9日 
 [js-ipfs 0.30.0](https://ipfs.io/blog/40-js-ipfs-0-30/) 发布

> 2018年6月15日 
[go-libp2p 6.0.0](https://ipfs.io/blog/39-go-libp2p-6-0-0/) 发布

##### 媒体报道

> TechCrunch
[Why The Internet Needs IPFS Before It’s Too Late](https://techcrunch.com/2015/10/04/why-the-internet-needs-ipfs-before-its-too-late/)

> Motherboard
[IPFS Wants to Create a Permanent Web](https://motherboard.vice.com/en_us/article/78xgaq/the-interplanetary-file-system-wants-to-create-a-permanent-web)

> MakeUseOf
[Faster, Safer, Decentralized Internet With IPFS](https://www.makeuseof.com/tag/goodbye-http-faster-safer-decentralized-internet-ipfs/)

##### 视频

[![IPFS Demo](http://img.youtube.com/vi/8CMxDNuuAiQ/0.jpg)](https://www.youtube.com/watch?v=8CMxDNuuAiQ)
[IPFS Demo](https://www.youtube.com/watch?v=8CMxDNuuAiQ)

[![The Distributed, Permanent Web](http://img.youtube.com/vi/HUVmypx9HGI/0.jpg)](https://www.youtube.com/watch?v=HUVmypx9HGI)
[The Distributed, Permanent Web](https://www.youtube.com/watch?v=HUVmypx9HGI)


---

Tip打赏

翻译 [yangliu](https://www.binstd.com/u/yangliu)

ETH: `0x85d718C27a3eB0be78A5835C0805A7b1834A6B34`

站长 [cho](https://www.binstd.com/u/cho)

1. BTC: `1Af2Q23Y1kqgtgbryzjS7RxrnEmyvYuX4b`
2. ETH: `0x6bcCfb7265d4aB0C1a71F7d19b9E581cae73D777`