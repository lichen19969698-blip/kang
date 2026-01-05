import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MapView } from "@/components/Map";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const submitMutation = trpc.contact.submit.useMutation();

  const onSubmit = async (data: any) => {
    try {
      await submitMutation.mutateAsync({
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });
      toast.success("消息已发送！我们会尽快与您联系。");
      reset();
    } catch (error: any) {
      toast.error(error.message || "发送失败，请稍后重试");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header - Reduced padding */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">联系我们</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base">
            无论您有产品咨询、报价需求还是技术问题，我们的团队随时为您服务。
          </p>
        </div>
      </div>

      <div className="container -mt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Contact Info & Map */}
          <div className="lg:col-span-4 space-y-6">
            {/* Combined Info Card */}
            <Card className="shadow-md border-none">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">电话咨询</h3>
                    <p className="text-slate-600 text-xs mb-1">周一至周五, 9:00 - 18:00</p>
                    <p className="text-lg font-bold text-primary">13926962928</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">邮件联系</h3>
                    <p className="text-slate-600 text-xs mb-1">我们将于 24 小时内回复</p>
                    <p className="text-base font-bold text-primary break-all">15829053969@163.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-2 border-t border-slate-100">
                  <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">公司地址</h3>
                    <p className="text-slate-600 text-xs">广东省深圳市南山区科技园</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Card - Integrated into column */}
            <Card className="border-none shadow-md overflow-hidden h-[300px]">
               <MapView 
                  className="w-full h-full"
                  onMapReady={(map: google.maps.Map) => {
                    const position = { lat: 22.543099, lng: 113.940157 };
                    map.setCenter(position);
                    map.setZoom(15);
                    new google.maps.Marker({
                      position: position,
                      map: map,
                      title: "ElecBoard Tech Headquarters"
                    });
                  }}
               />
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8">
            <Card className="border-none shadow-md h-full">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">发送消息</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">姓名</label>
                      <Input {...register("name", { required: true })} placeholder="您的姓名" className="bg-slate-50/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">公司名称</label>
                      <Input {...register("company")} placeholder="您的公司" className="bg-slate-50/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">邮箱</label>
                      <Input {...register("email", { required: true })} type="email" placeholder="name@example.com" className="bg-slate-50/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">电话</label>
                      <Input {...register("phone")} placeholder="联系电话" className="bg-slate-50/50" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">咨询内容</label>
                    <Textarea {...register("message", { required: true })} placeholder="请描述您的需求..." className="min-h-[180px] bg-slate-50/50" />
                  </div>
                  <Button type="submit" className="w-full py-6 text-lg" disabled={submitMutation.isPending}>
                    {submitMutation.isPending ? "发送中..." : "发送消息"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
