# -*- coding: utf-8 -*-
"""临时脚本：通过 Crossref 检索缺失 DOI 的三篇论文。用后即删。"""
import json
import urllib.parse
import urllib.request

QUERIES = [
    ("018-insar-gee-blacksoil",
     "Using advanced InSAR techniques and Machine learning in Google Earth Engine (GEE) to monitor regional black soil erosion"),
    ("022-loess-soc-distribution",
     "黄土丘陵区退耕小流域土壤有机碳分布特征及地形植被对其的影响"),
    ("021-grass-legume-nitrogen",
     "禾豆间作系统水分和根系分隔对牧草氮素吸收利用及转移的影响"),
]

for name, title in QUERIES:
    url = ("https://api.crossref.org/works?query.title="
           + urllib.parse.quote(title)
           + "&rows=3&select=DOI,title,container-title,issued,volume,page,article-number")
    req = urllib.request.Request(url, headers={
        "User-Agent": "soil-ecology-lab-doi-check/1.0 (mailto:hqliu@example.com)"
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read().decode("utf-8"))
        items = data.get("message", {}).get("items", [])
        print("=====", name)
        if not items:
            print("  (no crossref result)")
        for it in items:
            t = (it.get("title") or [""])[0]
            j = (it.get("container-title") or [""])[0]
            yr = it.get("issued", {}).get("date-parts", [["?"]])[0][0]
            print("  DOI:", it.get("DOI"))
            print("  title:", t[:80])
            print("  journal:", j, "| year:", yr, "| vol:", it.get("volume"), "| page:", it.get("page"), it.get("article-number"))
    except Exception as e:
        print("=====", name, "ERROR:", e)