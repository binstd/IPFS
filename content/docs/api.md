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
* recursive [bool]: 递归添加目录路径。缺省：“假”。是否必要: 否。
* quiet [bool]: 输出最小值。 是否必要: 否。
* quieter [bool]: 输出最终唯一哈希值。是否必要: 否。
* silent [bool]: Write no output. 是否必要: 否。
* progress [bool]: Stream progress data. 是否必要: 否。
* trickle [bool]: Use trickle-dag format for dag generation. 是否必要: 否。
* only-hash [bool]: Only chunk and hash - do not write to disk. 是否必要: 否。
* wrap-with-directory [bool]: Wrap files with a directory object. 是否必要: 否。
* hidden [bool]: Include files that are hidden. Only takes effect on recursive add. 是否必要: 否。
* chunker [string]: Chunking algorithm to use.是否必要: 否。
* pin [bool]: Pin this object when adding. Default: “true”. 是否必要: 否。
* raw-leaves [bool]: Use raw blocks for leaf nodes. (experimental). 是否必要: 否。
* nocopy [bool]: Add the file using filestore. (experimental). 是否必要: 否。
* fscache [bool]: Check the filestore for pre-existing blocks. (experimental). 是否必要: 否。
* cid-version [int]: Cid version. Non-zero value will change default of ‘raw-leaves’ to true.  (experimental). Default: “0”. 是否必要: 否。
* hash [string]: Hash function to use. Will set Cid version to 1 if used. (experimental). Default: “sha2-256”. 是否必要: 否。

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

* arg [file]: The data to be stored as an IPFS block. Required: yes.
* format [string]: cid format for blocks to be created with. Default: “v0”. Required: no.
* mhtype [string]: multihash hash function. Default: “sha2-256”. Required: no.
* mhlen [int]: multihash hash length. Default: “-1”. Required: no.

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

* arg [string]: Bash58 encoded multihash of block(s) to remove. Required: yes.
* force [bool]: Ignore nonexistent blocks. Default: “false”. Required: no.
* quiet [bool]: Write minimal output. Default: “false”. Required: no.

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

* arg [string]: 当前块的base58 multihash. Required: yes.

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

* flags [bool]: Show command flags. Default: “false”. Required: no.

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

* arg [file]: The file to use as the new config. Required: yes.

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

* arg [string]: The object to get Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/dag/get?arg=<ref>"

### /api/v0/dag/put

向ipfs中添加一个dag节点。

#### 参数

* arg [file]: The object to put Required: yes.
* format [string]: Format that the object will be added as. Default: “cbor”. Required: no.
* input-enc [string]: Format that the input object will be. Default: “json”. Required: no.
* pin [bool]: Pin this object when adding. Default: “false”. Required: no.
* hash [string]: Hash function to use. Default: . Required: no.

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

* arg [string]: The path to resolve Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    {
        "Cid": "<string>"
        "RemPath": "<string>"
    }

#### cURL 示例

    curl "http://localhost:5001/api/v0/dag/resolve?arg=<ref>"

### /api/v0/dht/findpeer

在DHT表中查找与peer ID相连的地址。

#### 参数

* arg [string]: The ID of the peer to search for. Required: yes.
* verbose [bool]: Print extra information. Default: “false”. Required: no.

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

在DHT中查找可以提供特定值(给定键)的peers。

#### 参数

* arg [string]: The key to find providers for. Required: yes.
* verbose [bool]: Print extra information. Default: “false”. Required: no.
* num-providers [int]: The number of providers to find. Default: “20”. Required: no.

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

* arg [string]: The key to find a value for. Required: yes.
* verbose [bool]: Print extra information. Default: “false”. Required: no.

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

向网络宣布您正在提供给定的值。

#### 参数

* arg [string]: The key[s] to send provide records for. Required: yes.
* verbose [bool]: Print extra information. Default: “false”. Required: no.
* recursive [bool]: Recursively provide entire graph. Default: “false”. Required: no.

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

将键/值对写入DHT。

#### 参数

* arg [string]: The key to store the value at. Required: yes.
* arg [string]: The value to store. Required: yes.
* verbose [bool]: Print extra information. Default: “false”. Required: no.

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

通过查询DHT找到与给定Peer ID最近的Peer IDs。

#### 参数

* arg [string]: The peerID to run the query against. Required: yes.
* verbose [bool]: Print extra information. Default: “false”. Required: no.

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

* arg [string]: Time to keep inactive requests in log. Required: yes.

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

解决DNS链接。

#### 参数

* arg [string]: The domain-name name to resolve. Required: yes.
* recursive [bool]: Resolve until the result is not a DNS link. Default: “false”. Required: no.

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

* arg [string]: The path to the IPFS object(s) to list links from. Required: yes.

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

* arg [string]: Source object to copy. Required: yes.
* arg [string]: Destination to copy object to. Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/cp?arg=<source>&arg=<dest>"

### /api/v0/files/flush

将给定路径的数据刷新到磁盘。

#### 参数

* arg [string]: Path to flush. Default: ‘/’. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/flush?arg=<path>"

### /api/v0/files/ls

列出本地可变名称空间中的目录。

#### 参数

* arg [string]: Path to show listing for. Defaults to ‘/’. Required: no.
* l [bool]: Use long listing format. Required: no.

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

* arg [string]: Path to dir to make. Required: yes.
* parents [bool]: No error if existing, make parent directories as needed. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/mkdir?arg=<path>&parents=<value>"

### /api/v0/files/mv

移动文件。

#### 参数

* arg [string]: Source file to move. Required: yes.
* arg [string]: Destination path for file to be moved to. Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/mv?arg=<source>&arg=<dest>"

### /api/v0/files/read

读取给定mfs中的文件。

#### 参数

* arg [string]: Path to file to be read. Required: yes.
* offset [int]: Byte offset to begin reading from. Required: no.
* count [int]: Maximum number of bytes to read. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/read?arg=<path>&offset=<value>&count=<value>"

### /api/v0/files/rm

移除文件。

#### 参数

* arg [string]: File to remove. Required: yes.
* recursive [bool]: Recursively remove directories. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/files/rm?arg=<path>&recursive=<value>"

### /api/v0/files/stat

显示文件状态。

#### 参数

* arg [string]: Path to node to stat. Required: yes.
* format [string]: Print statistics in given format. Allowed tokens: . Conflicts with other format options. Default: Size: CumulativeSize: ChildBlocks: Type: . Default: “ Size: CumulativeSize: ChildBlocks: Type: ”. Required: no.
* hash [bool]: Print only hash. Implies ‘–format=’. Conflicts with other format options. Default: “false”. Required: no.
* size [bool]: Print only size. Implies ‘–format=’. Conflicts with other format options. Default: “false”. Required: no.

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

* arg [string]: Path to write to. Required: yes.
* arg [file]: Data to write. Required: yes.
* offset [int]: Byte offset to begin writing at. Required: no.
* create [bool]: Create the file if it does not exist. Required: no.
* truncate [bool]: Truncate the file to size zero before writing. Required: no.
* count [int]: Maximum number of bytes to read. Required: no.

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

* arg [string]: Cid of objects to list. Required: no.
* file-order [bool]: sort the results based on the path of the backing file. Required: no.

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

* arg [string]: Cid of objects to verify. Required: no.
* file-order [bool]: verify the objects based on the order of the backing file. Required: no.

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

* arg [string]: The path to the IPFS object(s) to be outputted. Required: yes.
* output [string]: The path where the output should be stored. Required: no.
* archive [bool]: Output a TAR archive. Default: “false”. Required: no.
* compress [bool]: Compress the output with GZIP compression. Default: “false”. Required: no.
* compression-level [int]: The level of compression (1-9). Default: “-1”. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/get?arg=<ipfs-path>&output= <value>&archive=false&compress=false&compression-level=-1"

### /api/v0/id

显示ipfs节点id。

#### 参数

* arg [string]: Peer.ID of node to look up. Required: no.
* format [string]: Optional output format. Required: no.

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

* arg [string]: name of key to create Required: yes.
* type [string]: type of the key to create [rsa, ed25519]. Required: no.
* size [int]: size of the key to generate. Required: no.

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

* l [bool]: Show extra information about keys. Required: no.

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

* arg [string]: name of key to rename Required: yes.
* arg [string]: new name of the key Required: yes.
* force [bool]: Allow to overwrite an existing key. Required: no.

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

* arg [string]: names of keys to remove Required: yes.
* l [bool]: Show extra information about keys. Required: no.

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

* arg [string]: The subsystem logging identifier. Use ‘all’ for all subsystems. Required: yes.
* arg [string]: The log level, with ‘debug’ the most verbose and ‘critical’ the least verbose. One of: debug, info, warning, error, critical. Required: yes.

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

* arg [string]: The path to the IPFS object(s) to list links from. Required: yes.
* headers [bool]: Print table headers (Hash, Size, Name). Default: “false”. Required: no.
* resolve-type [bool]: Resolve linked objects to find out their types. Default: “true”. Required: no.

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

* ipfs-path [string]: The path where IPFS should be mounted. Required: no.
* ipns-path [string]: The path where IPNS should be mounted. Required: no.

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

* arg [string]: ipfs path of the object to be published. Required: yes.
* resolve [bool]: Resolve given path before publishing. Default: “true”. Required: no.
* lifetime [string]: Time duration that the record will be valid for. This accepts durations such as “300s”, “1.5h” or “2h45m”. Valid time units are “ns”, “us” (or “µs”), “ms”, “s”, “m”, “h”. Default: “24h”. Required: no.
* ttl [string]: Time duration this record should be cached for (caution: experimental). Required: no.
* key [string]: Name of the key to be used or a valid PeerID, as listed by ‘ipfs key list -l’. Default:. Default: “self”. Required: no.

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

* arg [string]: The IPNS name to resolve. Defaults to your node’s peerID. Required: no.
* recursive [bool]: Resolve until the result is not an IPNS name. Default: “false”. Required: no.
* nocache [bool]: Do not use cached entries. Default: “false”. Required: no.

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

* arg [string]: Key of the object to retrieve, in base58-encoded multihash format. Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

     curl "http://localhost:5001/api/v0/object/data?arg=<key>"

### /api/v0/object/diff

显示两个ipfs对象之间的差异。

#### 参数

* arg [string]: Object to diff against. Required: yes.
* arg [string]: Object to diff. Required: yes.
* verbose [bool]: Print extra information. Required: no.

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

* arg [string]: Key of the object to retrieve, in base58-encoded multihash format. Required: yes.

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

* arg [string]: Key of the object to retrieve, in base58-encoded multihash format. Required: yes.
* headers [bool]: Print table headers (Hash, Size, Name). Default: “false”. Required: no.

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

* arg [string]: Template to use. Optional. Required: no.

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

* arg [string]: The hash of the node to modify. Required: yes.
* arg [string]: Name of link to create. Required: yes.
* arg [string]: IPFS object to add link to. Required: yes.
* create [bool]: Create intermediary nodes. Default: “false”. Required: no.

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

* arg [string]: The hash of the node to modify. Required: yes.
* arg [file]: Data to append. Required: yes.

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

* arg [string]: The hash of the node to modify. Required: yes.
* arg [string]: Name of the link to remove. Required: yes.

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

* arg [string]: The hash of the node to modify. Required: yes.
* arg [file]: The data to set the object to. Required: yes.

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

* arg [file]: Data to be stored as a DAG object. Required: yes.
* inputenc [string]: Encoding type of input data. One of: {“protobuf”, “json”}. Default: “json”. Required: no.
* datafieldenc [string]: Encoding type of the data field, either “text” or “base64”. Default: “text”. Required: no.
* pin [bool]: Pin this object when adding. Default: “false”. Required: no.

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

* arg [string]: Key of the object to retrieve, in base58-encoded multihash format. Required: yes.

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

* arg [string]: P2P listener protocol Required: no.
* all [bool]: Close all listeners. Default: “false”. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/p2p/listener/close?arg=<Protocol>&all=false"

### /api/v0/p2p/listener/ls

列举活跃的p2p listener。

#### 参数

* headers [bool]: Print table headers (HandlerID, Protocol, Local, Remote). Default: “false”. Required: no.

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

* arg [string]: Protocol identifier. Required: yes.
* arg [string]: Request handling application address. Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/p2p/listener/open?arg=<Protocol>&arg=<Address>"

### /api/v0/p2p/stream/close

关闭活跃的p2p流。

#### 参数

* arg [string]: Stream HandlerID Required: no.
* all [bool]: Close all streams. Default: “false”. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/p2p/stream/close?arg=<HandlerID>&all=false"

### /api/v0/p2p/stream/dial

拨号到p2p Listener。

#### 参数

* arg [string]: Remote peer to connect to Required: yes.
* arg [string]: Protocol identifier. Required: yes.
* arg [string]: Address to listen for connection/s (default: /ip4/127.0.0.1/tcp/0). Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl 
    "http://localhost:5001/api/v0/p2p/stream/dial?arg=<Peer>&arg=<Protocol>&arg=<BindAddress>"

### /api/v0/p2p/stream/ls

列出活跃的p2p流。

#### 参数

* headers [bool]: Print table headers (HagndlerID, Protocol, Local, Remote). Default: “false”. Required: no.

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

* arg [string]: Path to object(s) to be pinned. Required: yes.
* recursive [bool]: Recursively pin the object linked to by the specified object(s). Default: “true”. Required: no.
* progress [bool]: Show progress. Required: no.

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

* arg [string]: Path to object(s) to be listed. Required: no.
* type [string]: The type of pinned keys to list. Can be “direct”, “indirect”, “recursive”, or “all”. Default: “all”. Required: no.
* quiet [bool]: Write just hashes of objects. Default: “false”. Required: no.

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

* arg [string]: Path to object(s) to be unpinned. Required: yes.
* recursive [bool]: Recursively unpin the object linked to by the specified object(s). Default: “true”. Required: no.

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

* arg [string]: Path to old object. Required: yes.
* arg [string]: Path to new object to be pinned. Required: yes.
* unpin [bool]: Remove the old pin. Default: “true”. Required: no.

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

* verbose [bool]: Also write the hashes of non-broken pins. Required: no.
* quiet [bool]: Write just hashes of broken pins. Required: no.

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

* arg [string]: ID of peer to be pinged. Required: yes.
* count [int]: Number of ping messages to send. Default: “10”. Required: no.

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

列出我们现在正在连接的peers。

#### 参数

* arg [string]: topic to list connected peers of Required: no.

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

* arg [string]: Topic to publish to. Required: yes.
* arg [string]: Payload of message to publish. Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/pubsub/pub?arg=<topic>&arg=<data>"

### /api/v0/pubsub/sub

订阅关于给定主题的消息。

#### 参数

* arg [string]: String name of topic to subscribe to. Required: yes.
* discover [bool]: try to discover other peers subscribed to the same topic. Required: no.

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

* quiet [bool]: Write minimal output. Default: “false”. Required: no.
* stream-errors [bool]: Stream errors. Default: “false”. Required: no.

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

* human [bool]: Output RepoSize in MiB. Default: “false”. Required: no.

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

* quiet [bool]: Write minimal output. Required: no.

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

* arg [string]: The name to resolve. Required: yes.
* recursive [bool]: Resolve until the result is an IPFS name. Default: “false”. Required: no.

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

* peer [string]: Specify a peer to print bandwidth for. Required: no.
* proto [string]: Specify a protocol to print bandwidth for. Required: no.
* poll [bool]: Print bandwidth at an interval. Default: “false”. Required: no.
* interval [string]: Time interval to wait between updating output, if ‘poll’ is true.
   
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

* human [bool]: Output RepoSize in MiB. Default: “false”. Required: no.

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

* id [bool]: Show peer ID in addresses. Default: “false”. Required: no.

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

* arg [string]: Address of peer to connect to. Required: yes.

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

* arg [string]: Address of peer to disconnect from. Required: yes.

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

* arg [string]: Multiaddr to filter. Required: yes.

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

* arg [string]: Multiaddr filter to remove. Required: yes.

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

* verbose [bool]: display all extra information. Required: no.
* streams [bool]: Also list information about open streams for each peer. Required: no.
* latency [bool]: Also list information about latency to each peer. Required: no.

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

* arg [file]: Tar file to add. Required: yes.

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

* arg [string]: ipfs path of archive to export. Required: yes.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/tar/cat?arg=<path>"

### /api/v0/update

#### 参数

* arg [string]: Arguments for subcommand. Required: no.

#### 响应

请求成功，调用该路径将返回 Code 200 及如下结果:

    This endpoint returns a `text/plain` response body.

#### cURL 示例

    curl "http://localhost:5001/api/v0/update?arg=<args>"

### /api/v0/version

获取ipfs版本信息。

#### 参数

* number [bool]: Only show the version number. Default: “false”. Required: no.
* commit [bool]: Show the commit hash. Default: “false”. Required: no.
* repo [bool]: Show repo version. Default: “false”. Required: no.
* all [bool]: Show all version information. Default: “false”. Required: no.

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

## 写在最后

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

Tip
打赏

校对 [sarah21cn](https://www.binstd.com/u/sarah21cn)

ETH: `0xC70702AF123338852B91A2e26BeE9B256b6a2080`

校对 [yangliu](https://www.binstd.com/u/yangliu)

ETH: `0x85d718C27a3eB0be78A5835C0805A7b1834A6B34`

站长 [cho](https://www.binstd.com/u/cho)

1. BTC: `1Af2Q23Y1kqgtgbryzjS7RxrnEmyvYuX4b`
2. ETH: `0x6bcCfb7265d4aB0C1a71F7d19b9E581cae73D777`