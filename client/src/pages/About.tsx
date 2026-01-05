import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Award, Globe, Users } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/about-factory-cleanroom.jpg" 
            alt="Advanced Manufacturing Facility" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="container relative z-10 text-center text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">致力于材料科技的创新</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            自 2005 年成立以来，ElecBoard Tech 始终站在电子基材制造技术的前沿。
          </p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">关于 ElecBoard Tech</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                ElecBoard Tech 是一家全球领先的覆铜板（CCL）及电子基材制造商。我们专注于为 PCB 产业提供高性能、高可靠性的基础材料，产品广泛应用于通讯设备、汽车电子、航空航天及消费电子等领域。
              </p>
              <p>
                我们在中国深圳和苏州拥有两个现代化生产基地，总占地面积超过 10 万平方米，年产能达到 2000 万张。通过持续的研发投入和严格的质量管理，我们致力于成为全球电子制造企业最值得信赖的合作伙伴。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-4 border-primary pl-4">
                <div className="text-3xl font-bold text-slate-900">18+</div>
                <div className="text-sm text-slate-500">年行业经验</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="text-3xl font-bold text-slate-900">50+</div>
                <div className="text-sm text-slate-500">出口国家/地区</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="text-3xl font-bold text-slate-900">200+</div>
                <div className="text-sm text-slate-500">研发专利</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="text-3xl font-bold text-slate-900">ISO</div>
                <div className="text-sm text-slate-500">全体系认证</div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="/images/about-factory-cleanroom.jpg" 
              alt="Factory Floor" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">我们的核心价值</h2>
            <p className="text-slate-600">
              每一块板材背后，都是我们对品质、创新和客户承诺的坚守。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">品质至上</h3>
                <p className="text-slate-600">
                  执行严于 IPC 标准的内部质量控制体系。从原材料入库到成品出货，经过 36 道工序的严格检测。
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">绿色制造</h3>
                <p className="text-slate-600">
                  全面推行无卤素、无铅制程。投资先进的废气废水处理系统，致力于实现可持续发展的工业制造。
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">客户导向</h3>
                <p className="text-slate-600">
                  提供 24/7 技术支持与快速打样服务。我们的应用工程师团队随时准备协助您解决材料选型难题。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">想参观我们的工厂？</h2>
          <Link href="/contact">
            <Button size="lg" className="px-8">预约实地考察</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
