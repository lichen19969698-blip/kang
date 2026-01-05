import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Layers, Zap, ShieldCheck, Cpu } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-pcb-macro.jpg" 
            alt="High precision PCB background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              工业级电子基材专家
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              精密制造的<br />
              <span className="text-primary">坚实基石</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              提供高性能 FR-4、金属基板及高频微波板材。以卓越的尺寸稳定性与电气性能，助力您的电子产品在严苛环境中稳定运行。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="text-base font-semibold px-8 h-12 rounded-sm">
                  浏览产品系列 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-base font-semibold px-8 h-12 rounded-sm bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white">
                  联系销售团队
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">为什么选择 ElecBoard?</h2>
            <p className="text-slate-600">
              我们深知基材质量决定了最终电子产品的可靠性。因此，我们坚持严苛的质量标准，确保每一块板材都符合工业级要求。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                title: "IPC 二级/三级标准",
                desc: "所有产品严格遵循 IPC-4101 标准生产，确保在极端温度和湿度下的电气性能稳定性。"
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "卓越的电气性能",
                desc: "低介电损耗，高击穿电压。专为高频高速信号传输设计，满足 5G 通信与汽车电子需求。"
              },
              {
                icon: <Layers className="h-10 w-10 text-primary" />,
                title: "精密层压工艺",
                desc: "采用先进的真空层压技术，确保板材厚度均匀，无气泡、无分层，适合高多层板制造。"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">核心产品系列</h2>
              <p className="text-slate-600">满足从消费电子到航空航天的多样化需求</p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary/80 hover:bg-blue-50">
                查看所有产品 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img 
                  src="/images/product-fr4.jpg" 
                  alt="FR-4 Laminate" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-slate-900 rounded-sm shadow-sm">
                  热销
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900">FR-4 环氧玻纤覆铜板</h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  行业标准的高性能基材，具有优异的机械强度和电气绝缘性。广泛应用于计算机、通讯设备及工业控制。
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">TG: 135-180°C</span>
                  <Link href="/products">
                    <span className="text-sm font-medium text-primary flex items-center cursor-pointer group-hover:underline">
                      详情 <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src="/images/product-aluminum-base.jpg" 
                  alt="Aluminum Base CCL" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900">金属基覆铜板 (IMS)</h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  铝基或铜基散热板材，专为高功率 LED 照明、电源模块及汽车电子设计，提供卓越的热传导性能。
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">导热率: 1.0-8.0 W/mK</span>
                  <Link href="/products">
                    <span className="text-sm font-medium text-primary flex items-center cursor-pointer group-hover:underline">
                      详情 <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src="/images/product-copper-clad.jpg" 
                  alt="High Frequency Material" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900">高频微波板材</h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  低损耗 PTFE 或碳氢化合物基材，专为 5G 天线、雷达系统及卫星通讯设计，确保信号完整性。
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Dk: 2.2-3.5</span>
                  <Link href="/products">
                    <span className="text-sm font-medium text-primary flex items-center cursor-pointer group-hover:underline">
                      详情 <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full">查看所有产品</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container relative z-10 text-center max-w-2xl mx-auto space-y-8">
          <Cpu className="h-16 w-16 text-primary mx-auto opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">准备好提升您的产品性能了吗？</h2>
          <p className="text-slate-400 text-lg">
            联系我们的技术专家，获取免费样品及定制化材料解决方案。我们承诺 24 小时内响应您的询价。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact">
              <Button size="lg" className="px-8 h-12 text-base font-semibold rounded-sm">立即咨询</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="px-8 h-12 text-base font-semibold rounded-sm bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">了解更多</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
