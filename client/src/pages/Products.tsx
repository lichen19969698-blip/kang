import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Products() {
  const products = {
    standard: [
      {
        id: "fr4-std",
        name: "EB-401 标准 FR-4",
        desc: "通用型环氧玻纤布覆铜板，具有优良的机械性能和介电性能。",
        specs: { tg: "135°C", dk: "4.4", df: "0.018", cti: "175V" },
        features: ["UV 阻挡", "AOI 兼容", "优良的尺寸稳定性"],
        image: "/images/product-fr4.jpg"
      },
      {
        id: "fr4-hi-tg",
        name: "EB-402 High-Tg FR-4",
        desc: "高 Tg (170°C) 无铅制程专用板材，适用于多层板及高可靠性应用。",
        specs: { tg: "170°C", dk: "4.3", df: "0.016", cti: "600V" },
        features: ["低 Z-轴膨胀系数", "优异的耐热性", "抗 CAF 性能"],
        image: "/images/product-fr4.jpg"
      }
    ],
    metal: [
      {
        id: "al-base",
        name: "EB-M101 铝基板",
        desc: "高导热铝基覆铜板，专为 LED 照明及电源模块设计。",
        specs: { thermal: "2.0 W/mK", breakdown: ">3KV", peel: "1.2 N/mm" },
        features: ["优异的散热性能", "电磁屏蔽效果好", "机械强度高"],
        image: "/images/product-aluminum-base.jpg"
      },
      {
        id: "cu-base",
        name: "EB-M201 铜基板",
        desc: "超高导热铜基板，适用于高功率密度电子器件。",
        specs: { thermal: "398 W/mK (Base)", breakdown: ">4KV", peel: "1.4 N/mm" },
        features: ["极致散热", "热膨胀系数匹配", "适合大电流应用"],
        image: "/images/product-aluminum-base.jpg"
      }
    ],
    highfreq: [
      {
        id: "hf-ptfe",
        name: "EB-H500 PTFE",
        desc: "聚四氟乙烯玻璃纤维布层压板，专为微波射频电路设计。",
        specs: { dk: "2.20", df: "0.0009", absorb: "<0.02%" },
        features: ["极低介电损耗", "频率稳定性好", "耐化学腐蚀"],
        image: "/images/product-copper-clad.jpg"
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">产品中心</h1>
          <p className="text-slate-600 max-w-2xl">
            探索我们全面的电子基材解决方案。从标准 FR-4 到高性能特殊板材，我们为您的每一个工程挑战提供合适的材料。
          </p>
        </div>
      </div>

      <div className="container mt-12">
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="bg-white p-1 border border-slate-200 rounded-md h-auto flex-wrap justify-start gap-2">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm px-6 py-2">全部产品</TabsTrigger>
            <TabsTrigger value="fr4" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm px-6 py-2">FR-4 系列</TabsTrigger>
            <TabsTrigger value="metal" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm px-6 py-2">金属基板 (IMS)</TabsTrigger>
            <TabsTrigger value="highfreq" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-sm px-6 py-2">高频/高速</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            {/* FR-4 Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">FR-4 环氧玻纤系列</h2>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {products.standard.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Metal Base Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">金属基板 (IMS) 系列</h2>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {products.metal.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* High Freq Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">高频微波系列</h2>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {products.highfreq.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Individual Tab Contents (Simplified for brevity, reusing components) */}
          <TabsContent value="fr4" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.standard.map(product => <ProductCard key={product.id} product={product} />)}
          </TabsContent>
          <TabsContent value="metal" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.metal.map(product => <ProductCard key={product.id} product={product} />)}
          </TabsContent>
          <TabsContent value="highfreq" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.highfreq.map(product => <ProductCard key={product.id} product={product} />)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/3 bg-slate-100 relative min-h-[200px]">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{product.desc}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-3 rounded-sm border border-slate-100">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <span className="text-xs text-slate-400 uppercase font-mono block">{key}</span>
              <span className="text-sm font-semibold text-slate-700">{value as string}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.map((feature: string, i: number) => (
            <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-3">
          <Link href="/contact">
            <Button size="sm" className="flex-1">询价</Button>
          </Link>
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <FileText className="h-3 w-3" /> 数据表
          </Button>
        </div>
      </div>
    </Card>
  );
}
