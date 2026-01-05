import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl font-bold">联系我们</h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            无论您有产品咨询、报价需求还是技术问题，我们的团队随时为您服务。
          </p>
        </div>
      </div>

      <div className="container -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <Card className="shadow-lg border-none">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900">电话咨询</h3>
              <p className="text-slate-600 text-sm">
                周一至周五, 9:00 - 18:00
              </p>
              <p className="text-lg font-bold text-primary">13926962928</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-none">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900">邮件联系</h3>
              <p className="text-slate-600 text-sm">
                我们将于 24 小时内回复
              </p>
              <p className="text-lg font-bold text-primary">15829053969@163.com</p>
            </CardContent>
          </Card>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Contact Form */}
          <Card className="border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">发送消息</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">姓名</label>
                    <Input {...register("name", { required: true })} placeholder="您的姓名" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">公司名称</label>
                    <Input {...register("company")} placeholder="您的公司" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">邮箱</label>
                    <Input {...register("email", { required: true })} type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">电话</label>
                    <Input {...register("phone")} placeholder="联系电话" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">咨询内容</label>
                  <Textarea {...register("message", { required: true })} placeholder="请描述您的需求..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? "发送中..." : "发送消息"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="border-none shadow-md overflow-hidden min-h-[400px] lg:min-h-0">
             <MapView 
                className="w-full h-full min-h-[400px]"
                onMapReady={(map: google.maps.Map) => {
                  const position = { lat: 22.543099, lng: 113.940157 }; // Shenzhen Tech Park approx
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
      </div>
    </div>
  );
}
