---
id: xamarin-base
slug: /xamarin-base
title: 基础学习
date: 2024-11-04
authors: Hoo
tags: [xamarin]
keywords: ["xamarin"]
---

## Xamarin 基础



#### Syncfusion 插件

[**登入网站**](https://www.syncfusion.com/products/communitylicense)

[**syncfusion document**](https://help.syncfusion.com/xamarin/autocomplete/overview)

**获取 License** 

License & Downloads -> get License  -> 输入信息 -> 等待





#### 文件目录

```
ProjectName
	API               // RestFul API 文件夹
	Fonts             // 引入字体
	Models            // 对象模型
	PopUpPage         // PopUp 界面
	View              // 视图
	ViewModels        // MVVM 文件夹
	App.xaml.cs
		App.xaml.cs   // 配置 插件
	MainPage.xaml     // 默认主页（可以删除）
ProjectName.Android
	Resources
		drawable      // 引入图片文件夹
	MainActivity.cs   // Android 配置
ProjectName.iOS
```



#### 安装包

```
// 基本安装包
CardsView
Newtonsoft.Json
Rg.Plugins.Popup
Xam.Plugins.Forms.ImageCircle
Xamarin.Essentials
Xamarin.FFImageLoading.Forms
Xamarin.FOrms.PancakeView

// 获取通知
OneSignalSDK.Xamarin

// Syncfusion 安装包请查看 Documentation，安装你想要的
Syncfusion.Xamarin.Buttons
Syncfusion.Xamarin.Core
Syncfusion.Xamarin.SfAutoComplete
Syncfusion.Xamarin.SfMaskedEdit
Syncfusion.Xamarin.SfRotator
Syncfusion.Xamarin.SfTabView
```


#### App.xaml.cs 配置

```c#
using System;
using Cinema.View;
using OneSignalSDK.Xamarin;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

// 引入 字体
[assembly: ExportFont("ZCOOLKuaiLe-Regular.ttf", Alias = "AC")]
[assembly: ExportFont("Kalam-Regular.ttf", Alias = "BC")]
[assembly: ExportFont("Playball-Regular.ttf", Alias = "CC")]
[assembly: ExportFont("Merienda-Bold.ttf", Alias = "DC")]
[assembly: ExportFont("BerkshireSwash-Regular.ttf", Alias = "EC")]
[assembly: ExportFont("ConcertOne-Regular.ttf", Alias = "FC")]
[assembly: ExportFont("Viga-Regular.ttf", Alias = "GC")]
[assembly: ExportFont("LibreBaskerville-Italic.ttf", Alias = "HC")]

// 引入 字体
[assembly: ExportFont("Exo2-VariableFont_wght.ttf", Alias = "AA")]
[assembly: ExportFont("BebasNeue-Regular.ttf", Alias = "BA")]
[assembly: ExportFont("NotoSerifSC-Bold.ttf", Alias = "CA")]
[assembly: ExportFont("Signika-VariableFont_wght.ttf", Alias = "DA")]
[assembly: ExportFont("AbrilFatface-Regular.ttf", Alias = "EA")]
[assembly: ExportFont("Kalam-Bold.ttf", Alias = "FA")]

namespace Cinema
{
	public partial class App : Application
	{
		public App()
		{
			InitializeComponent();

			MainPage = new MainPage();

			// 注册 Syncfusion
 			Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("放入你自己的License，这样就不会出现烦人的通知广告");

			// 默认 启动 首页
			MainPage = new NavigationPage(new Start());

			// 配置 通知 信息
			OneSignal.Default.Initialize("放入你自己的，去官网注册");
			OneSignal.Default.PromptForPushNotificationsWithUserResponse();
		}

		protected override void OnStart()
		{
		}

		protected override void OnSleep()
		{
		}

		protected override void OnResume()
		{
		}
	}
}
```



#### Android

**MainActivity.cs 配置**

```c#
using System;

using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.OS;
using ImageCircle.Forms.Plugin.Droid;
using Xamarin.Forms.PlatformConfiguration.AndroidSpecific;
using OneSignalSDK.Xamarin;

namespace Cinema.Droid
{
	[Activity(Label = "App 名称", Icon = "@drawable/App Icon 名称", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize)]
	public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
	{
		protected override void OnCreate(Bundle savedInstanceState)
		{
			base.OnCreate(savedInstanceState);

			// 手机 信息 通知
			OneSignal.Default.Initialize("放入你自己的，去官网注册");
			OneSignal.Default.PromptForPushNotificationsWithUserResponse();
            
            // PopUp 配置
			Rg.Plugins.Popup.Popup.Init(this);

			Xamarin.Essentials.Platform.Init(this, savedInstanceState);
			global::Xamarin.Forms.Forms.Init(this, savedInstanceState);
            
            // 圆形图片 配置
			ImageCircleRenderer.Init();
            
            // App Status Bar 颜色 配置
			Window.SetStatusBarColor(Android.Graphics.Color.Rgb(45, 45, 46));
			FFImageLoading.Forms.Platform.CachedImageRenderer.Init(true);
			LoadApplication(new App());
			Xamarin.Forms.Application.Current.On<Xamarin.Forms.PlatformConfiguration.Android>().UseWindowSoftInputModeAdjust(WindowSoftInputModeAdjust.Resize);
		}
		public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
		{
			Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

			base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
		}
	}
}
```





#### 字体 引入

右键 -> 属性 -> 选择生成操作 -> 嵌入的资源

然后在 App.xaml.cs 配置

```c#
[assembly: ExportFont("ZCOOLKuaiLe-Regular.ttf", Alias = "AC")]
[assembly: ExportFont("Kalam-Regular.ttf", Alias = "BC")]
[assembly: ExportFont("Playball-Regular.ttf", Alias = "CC")]
```



## 开始



#### API

UserApi 例子

```c#
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Cinema.Models;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Newtonsoft.Json;
using Cinema.ViewModel;
using System.Linq;

namespace Cinema.API
{
	public class UserDB
	{
        // 默认 API URL
		const string baseUrl = "http://10.0.2.2:5041/api/";
		HttpClient client = new HttpClient();
		public static string JWBToken = null;
		public static int userID = 0;

        // Admin Token
		public void Token_Admin()
		{
			Admin ad = new Admin()
			{
				Username = "hoo",
				Password = "hoo"
			};

			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri(baseUrl);
				StringContent content = new StringContent(JsonConvert.SerializeObject(ad), Encoding.UTF8, "application/json");

				var respose = client.PostAsync("AdminToken", content).Result;

				if (respose.IsSuccessStatusCode)
				{
					string token = respose.Content.ReadAsStringAsync().Result;
					if (token != "Invalid credentials")
					{
						JWBToken = token;
					}
				}
			}
		}

        // 用户 Token
		public void Token_User()
		{
			string Username = Preferences.Get("Username", string.Empty);
			string Password = Preferences.Get("Password", string.Empty);

			User user = new User()
			{
				Username = Username,
				Password = Password
			};

			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri(baseUrl);
				StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
				var respose = client.PostAsync("UserToken", content).Result;

				if (respose.IsSuccessStatusCode)
				{
					string token = respose.Content.ReadAsStringAsync().Result;
					if (token != "Invalid credentials")
						JWBToken = token;
				}
			}
		}

        // 获取 所有 用户 Token——Admin
		public async Task<ObservableCollection<User>> GetAllUser_Api()
		{
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWBToken);
			client.BaseAddress = new Uri(baseUrl);
			var respose = client.GetAsync("User").Result;

			if (respose.IsSuccessStatusCode)
			{
				string jsonString = respose.Content.ReadAsStringAsync().Result;
				return JsonConvert.DeserializeObject<ObservableCollection<User>>(jsonString);
			}

			return null;
		}

        // 获取 所有 用户 Token——Admin 主
		public ObservableCollection<User> GetAllUser()
		{
			Token_Admin();
			return GetAllUser_Api().Result;
		}

        // 获取 所有 用户 Token——User
		public User GetAllUser_One()
		{
			string Username = Preferences.Get("Username", string.Empty);
			string Password = Preferences.Get("Password", string.Empty);
			var userData = GetAllUser();
			var data = userData.Where(x => x.Username == Username & x.Password == Password).FirstOrDefault();
			if (data != null)
			{
				return data;
			}
			return null;
		}
		
        // 获取 所有 用户 Token——User 主
		public ObservableCollection<User> GetAllUser_User()
		{
			Token_User();
			return GetAllUser_Api().Result;
		}

         // 创建
		public async Task CreateUser_Api(User user)
		{
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWBToken);
			client.BaseAddress = new Uri(baseUrl);
			var respose = client.GetAsync("User").Result;

			if (respose.IsSuccessStatusCode)
			{
				var jsonStr = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
				await client.PostAsync(baseUrl + "User", jsonStr);
			}
		}

        // 创建 主
		public async Task CreateUser(User user)
		{
			Token_Admin();
			await CreateUser_Api(user);
		}

        // 修改
		public async Task EditUser_Api(User user)
		{
			var client2 = new HttpClient();

			// 设置 HttpClient 实例的属性
			client2.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWBToken);
			client2.BaseAddress = new Uri(baseUrl);

			var response = await client2.GetAsync("User");

			if (response.IsSuccessStatusCode)
			{
				var jsonStr = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
				await client.PutAsync(baseUrl + "User/" + user.UserID, jsonStr);
			}

		}

        // 修改 主
		public async Task EditUser(User user)
		{
			Token_User();
			EditUser_Api(user);
		}

	}
}
```

其他 例子

```c#
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using Cinema.Models;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;
using System.Linq;

namespace Cinema.API
{
	public class ActorDB
	{
		const string baseUrl = "http://10.0.2.2:5041/api/";
		HttpClient client = new HttpClient();
		public static string JWBToken = null;
		public static int userID = 0;

		public void Token_Admin()
		{
			Admin ad = new Admin()
			{
				Username = "hoo",
				Password = "hoo"
			};

			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri(baseUrl);
				StringContent content = new StringContent(JsonConvert.SerializeObject(ad), Encoding.UTF8, "application/json");

				var respose = client.PostAsync("AdminToken", content).Result;

				if (respose.IsSuccessStatusCode)
				{
					string token = respose.Content.ReadAsStringAsync().Result;
					if (token != "Invalid credentials")
					{
						JWBToken = token;
					}
				}
			}
		}

		public void Token_User()
		{
			string Username = Preferences.Get("Username", string.Empty);
			string Password = Preferences.Get("Password", string.Empty);

			User user = new User()
			{
				Username = Username,
				Password = Password
			};

			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri(baseUrl);
				StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
				var respose = client.PostAsync("UserToken", content).Result;

				if (respose.IsSuccessStatusCode)
				{
					string token = respose.Content.ReadAsStringAsync().Result;
					if (token != "Invalid credentials")
						JWBToken = token;
				}
			}
		}

		public async Task<ObservableCollection<Actor>> GetAllActor_Api()
		{
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWBToken);
			client.BaseAddress = new Uri(baseUrl);
			var respose = client.GetAsync("Actor").Result;

			if (respose.IsSuccessStatusCode)
			{
				string jsonString = respose.Content.ReadAsStringAsync().Result;
				return JsonConvert.DeserializeObject<ObservableCollection<Actor>>(jsonString);
			}

			return null;
		}

		public ObservableCollection<Actor> GetAllActor()
		{
			Token_Admin();
			return GetAllActor_Api().Result;
		}

		public ObservableCollection<Actor> GetAllActor_User()
		{
			Token_User();
			return GetAllActor_Api().Result;
		}

	}
}
```

```c#
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using Cinema.Models;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace Cinema.API
{
	public class HallDB
	{
		const string baseUrl = "http://10.0.2.2:5041/api/";
		HttpClient client = new HttpClient();
		public static string JWBToken = null;
		public static int userID = 0;

		public void Token_Admin()
		{
			Admin ad = new Admin()
			{
				Username = "hoo",
				Password = "hoo"
			};

			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri(baseUrl);
				StringContent content = new StringContent(JsonConvert.SerializeObject(ad), Encoding.UTF8, "application/json");

				var respose = client.PostAsync("AdminToken", content).Result;

				if (respose.IsSuccessStatusCode)
				{
					string token = respose.Content.ReadAsStringAsync().Result;
					if (token != "Invalid credentials")
					{
						JWBToken = token;
					}
				}
			}
		}

		public void Token_User()
		{
			string Username = Preferences.Get("Username", string.Empty);
			string Password = Preferences.Get("Password", string.Empty);

			User user = new User()
			{
				Username = Username,
				Password = Password
			};

			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri(baseUrl);
				StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
				var respose = client.PostAsync("UserToken", content).Result;

				if (respose.IsSuccessStatusCode)
				{
					string token = respose.Content.ReadAsStringAsync().Result;
					if (token != "Invalid credentials")
						JWBToken = token;
				}
			}
		}

		public async Task<ObservableCollection<Hall>> GetAllHall_Api()
		{
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWBToken);
			client.BaseAddress = new Uri(baseUrl);
			var respose = client.GetAsync("Hall").Result;

			if (respose.IsSuccessStatusCode)
			{
				string jsonString = respose.Content.ReadAsStringAsync().Result;
				return JsonConvert.DeserializeObject<ObservableCollection<Hall>>(jsonString);
			}

			return null;
		}

		public ObservableCollection<Hall> GetAllHall()
		{
			Token_Admin();
			return GetAllHall_Api().Result;
		}

		public ObservableCollection<Hall> GetAllHall_User()
		{
			Token_User();
			return GetAllHall_Api().Result;
		}

	}
}
```



#### Session（Preferences）

```c#
using Xamarin.Essentials;
```

```c#
// 存储字符串值
Preferences.Set("username", "Alice");

// 存储整数值
Preferences.Set("age", 25);

// 存储布尔值
Preferences.Set("isLoggedIn", true);
```

```c#
// 获取字符串值
string username = Preferences.Get("username", "defaultUser");

// 获取整数值
int age = Preferences.Get("age", 0);

// 获取布尔值
bool isLoggedIn = Preferences.Get("isLoggedIn", false);
```

```c#
Preferences.Remove("username");
```

```c#
Preferences.Clear();
```

```c#
// 从 Preferences 中获取用户信息，如果没有找到则返回空字符串
string Username = Preferences.Get("Username", string.Empty);
string Password = Preferences.Get("Password", string.Empty);
```



#### List / Split

```c#
List<string> list_inter = new List<string>();
// ["Hoo | Jely | Muyi | Noma"]
string[] str = movie_data.Genre.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries);
list_inter.AddRange(str);
// ["Hoo","Jely","Muyi","Noma"]
```



#### Back End

```c#
public CalendarPopup(Show db)
{
	InitializeComponent();
	showdb = db
	var movie_db = Moviedb_Detail.GetAllMovie();
	var movie_data = movie_db.Where(x => x.MovieID == db.MovieID).FirstOrDefault();
	MovieName.Text = movie_data.Title;
	DateText.Text = db.Date.ToString().Substring(0, 10);
	Time.Text = $"{db.StartTime} - {db.EndTime}";
}
```



#### XAML View

我的 `Sakura Cinama` 项目首页的代码，采用了 `MVVM` 方式来获取 `API` 数据。

#### **Font End**

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" 
             xmlns:abstractions="clr-namespace:ImageCircle.Forms.Plugin.Abstractions;assembly=ImageCircle.Forms.Plugin" 
             xmlns:inputLayout="clr-namespace:Syncfusion.XForms.TextInputLayout;assembly=Syncfusion.Core.XForms" 
             xmlns:tabView="clr-namespace:Syncfusion.XForms.TabView;assembly=Syncfusion.SfTabView.XForms"
             xmlns:autocomplete="clr-namespace:Syncfusion.SfAutoComplete.XForms;assembly=Syncfusion.SfAutoComplete.XForms" 
             xmlns:pancakeview="clr-namespace:Xamarin.Forms.PancakeView;assembly=Xamarin.Forms.PancakeView" 
             x:Class="Cinema.View.HomePage"
             NavigationPage.HasNavigationBar="False"
             xmlns:vm="clr-namespace:Cinema.ViewModel">

    <ContentPage.Resources>
        <ResourceDictionary>
            <vm:UserVM x:Key="UserVM"/>
            <vm:FunctionVM x:Key="FunctionVM"/>
        </ResourceDictionary>
    </ContentPage.Resources>

    <ContentPage.Content>

        <tabView:SfTabView BackgroundColor="#f2f2f2"  EnableSwiping="False"
                           TabHeaderPosition="Bottom" DisplayMode="Image"
                           VisibleHeaderCount="4">

            <tabView:SfTabView.SelectionIndicatorSettings>
                <tabView:SelectionIndicatorSettings Color="Transparent" Position="Fill" StrokeThickness="0"
                                                    AnimationDuration="10"/>
            </tabView:SfTabView.SelectionIndicatorSettings>

            <tabView:SfTabItem Title="Home"  ImageSource="homeIcon" SelectionColor="#000000" 				                                      TitleFontColor="#666666">
                <tabView:SfTabItem.Content>

                    <ScrollView BackgroundColor="#ECECEC">
                        <StackLayout Padding="0,20,0,0"
                         			HorizontalOptions="FillAndExpand" VerticalOptions="FillAndExpand" 			                                      BindingContext="{StaticResource UserVM}">

                            <Grid Padding="0,0,10,0">
                                <Grid.RowDefinitions>
                                    <RowDefinition Height="*"/>
                                    <RowDefinition Height="*"/>
                                </Grid.RowDefinitions>
                                <Grid.ColumnDefinitions>
                                    <ColumnDefinition Width="*"/>
                                    <ColumnDefinition Width="3*"/>
                                    <ColumnDefinition Width="0.6*"/>
                                </Grid.ColumnDefinitions>

                                <abstractions:CircleImage Aspect="AspectFit"
                                              WidthRequest="50"
                                              HeightRequest="50"
                                              HorizontalOptions="EndAndExpand"
                                              Source="{Binding UserAvatar}"
                                              Grid.Row="0"
                                              Grid.Column="0" Grid.RowSpan="2"
                                              Margin="0,0,10,0">
                                </abstractions:CircleImage>

                                <Label Text="{Binding UserFullname}" FontAttributes="Bold"
                           			  Grid.Row="0" Grid.Column="1" TextColor="Black" FontSize="15"/>
                                <Label Text="I cann't Write Something...."
                           			  Grid.Row="1" Grid.Column="1" FontSize="12"/>

                                <Frame CornerRadius="100" HasShadow="True" HeightRequest="30" WidthRequest="30"
                           			  BackgroundColor="white" Padding="5" Grid.Row="0" Grid.Column="2" 
                           			  Grid.RowSpan="2" Margin="3">
                                    <Image x:Name="notificationimg"  HeightRequest="5" WidthRequest="5"/>
                                    <Frame.GestureRecognizers>
                                        <TapGestureRecognizer Tapped="NotificationOpen"/>
                                    </Frame.GestureRecognizers>
                                </Frame>

                            </Grid>

                            <StackLayout Orientation="Horizontal" Padding="20,0,10,0" Margin="0,10,0,0">

                                <inputLayout:SfTextInputLayout Hint="Search Movie" ContainerType="Outlined"
                                                   LeadingViewPosition="Inside" WidthRequest="315"
                                                   OutlineCornerRadius="100" HeightRequest="0"
                                                   Margin="0" x:Name="SearchName"
                                                               >
                                    <inputLayout:SfTextInputLayout.LeadingView>
                                        <Image Source="searchIcon" HeightRequest="20" WidthRequest="50">
                                            <Image.GestureRecognizers>
                                                <TapGestureRecognizer Tapped="MoveSearch"/>
                                            </Image.GestureRecognizers>
                                        </Image>
                                    </inputLayout:SfTextInputLayout.LeadingView>
                                    <autocomplete:SfAutoComplete DataSource="{Binding SearName}" 
                                                                 x:Name="Search" HeightRequest="45"  
                                                                 AutoCompleteMode="SuggestAppend"
                                                                 TextHighlightMode="FirstOccurrence"
                                                                 HighlightedTextColor="Red" 
                                                                 SelectedItem="{Binding SelectionObject}"
                                                                 SelectionChanged="OnAutoCompleteItemSelected"
                                                                 Completed="Handle_Completed"
                                     HighlightedTextFontAttributes="Bold"
                                     SuggestionMode="StartsWith">
                                    </autocomplete:SfAutoComplete>
                                </inputLayout:SfTextInputLayout>

                                <Frame CornerRadius="100" HasShadow="True" HeightRequest="32" WidthRequest="32"
                                       BackgroundColor="Black" Padding="5" Margin="12,11,0,0">
                                    <Image Source="tuneIcon" HeightRequest="10" WidthRequest="10"/>
                                    <Frame.GestureRecognizers>
                                        <TapGestureRecognizer Tapped="OpenTenu"/>
                                    </Frame.GestureRecognizers>
                                </Frame>

                            </StackLayout>

                            <StackLayout Padding="20,0,10,0" Margin="0,18,0,5">
                                <Label Text="Hot Movie" FontAttributes="Bold" TextColor="black" FontSize="18"/>
                            </StackLayout>

                            <StackLayout>

                                <Grid x:Name="TopThreeGrid" HeightRequest="220" Padding="13,0,13,0">
                                    <Grid.RowDefinitions>
                                        <RowDefinition Height="*"/>
                                        <RowDefinition Height="*"/>
                                    </Grid.RowDefinitions>
                                    <Grid.ColumnDefinitions>
                                        <ColumnDefinition Width="*"/>
                                        <ColumnDefinition Width="*"/>
                                    </Grid.ColumnDefinitions>


                                    <Frame Padding="0" Grid.Row="0" Grid.RowSpan="2" Grid.Column="0"
                                           CornerRadius="20">
                                        <AbsoluteLayout>
                                            <Image Source="{Binding HotMovie[0].MoviePoster}" Aspect="AspectFill"
                                       			  AbsoluteLayout.LayoutFlags="All"
                                                   AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>

                                        </AbsoluteLayout>
                                        <Frame.GestureRecognizers>
                                            <TapGestureRecognizer Tapped="MovieHot" CommandParameter="{Binding HotMovie[0].MovieID}"/>
                                        </Frame.GestureRecognizers>
                                    </Frame>



                                    <Frame Padding="0" Grid.Row="0" Grid.Column="1"
                                           CornerRadius="20">
                                        <AbsoluteLayout>
                                            <Image Source="{Binding HotMovie[1].MoviePoster}" Aspect="AspectFill"
                                                   AbsoluteLayout.LayoutFlags="All"
                                                   AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>

                                            <StackLayout  AbsoluteLayout.LayoutFlags="All"
                                                          AbsoluteLayout.LayoutBounds="0,0,1,1" Padding="20">


                                            </StackLayout>
                                        </AbsoluteLayout>
                                        
                                        <Frame.GestureRecognizers>
                                            <TapGestureRecognizer Tapped="MovieHot" CommandParameter="{Binding HotMovie[1].MovieID}"/>
                                        </Frame.GestureRecognizers>
                                    </Frame>



                                    <Frame Padding="0" Grid.Row="1" Grid.Column="1"
                                           CornerRadius="20">
                                        <AbsoluteLayout>
                                            <Image Source="{Binding HotMovie[2].MoviePoster}" Aspect="AspectFill"
                                                   AbsoluteLayout.LayoutFlags="All"
                                                   AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>

                                            <StackLayout  AbsoluteLayout.LayoutFlags="All"
                                                          AbsoluteLayout.LayoutBounds="0,0,1,1" Padding="20">

                                            </StackLayout>
                                        </AbsoluteLayout>
                                        <Frame.GestureRecognizers>
                                            <TapGestureRecognizer Tapped="MovieHot" CommandParameter="{Binding HotMovie[2].MovieID}"/>
                                        </Frame.GestureRecognizers>
                                    </Frame>

                                </Grid>

                            </StackLayout>

                            <StackLayout HorizontalOptions="FillAndExpand"
                                         HeightRequest="60"
                                         Padding="0,0,0,0" Margin="0,10,0,5">

                                <CollectionView ItemsLayout="HorizontalList"
                                        x:Name="PromotionList"
                                        HeightRequest="250"
                                        HorizontalScrollBarVisibility="Never"
                                        VerticalOptions="Start">
                                    <CollectionView.ItemTemplate>
                                        <DataTemplate>

                                            <StackLayout Padding="10">
                                                <Frame HasShadow="True"
                                                       BackgroundColor="{Binding Genre}"
                                                       Padding="25,10"
                                                       CornerRadius="100"
                                                       BorderColor="LightGray">
                                                    <Label Text="{Binding Title}" FontAttributes="Bold"
                                                           TextColor="{Binding Duration}"/>
                                                </Frame>

                                                <StackLayout.GestureRecognizers>
                                                    <TapGestureRecognizer CommandParameter="{Binding Title}" Tapped="Follow"/>
                                                </StackLayout.GestureRecognizers>
                                            </StackLayout>


                                        </DataTemplate>
                                    </CollectionView.ItemTemplate>

                                </CollectionView>


                            </StackLayout>

                            <StackLayout>
                                <!--HeightRequest="710"-->
                                <CollectionView x:Name="MediaList"  Margin="10,0,20,0">
                                    <CollectionView.ItemsLayout>
                                        <GridItemsLayout Orientation="Vertical"
                                                         Span="2"
                                                         HorizontalItemSpacing="6"
                                                         VerticalItemSpacing="22"/>
                                    </CollectionView.ItemsLayout>
                                    <CollectionView.ItemTemplate>
                                        <DataTemplate>

                                            <Frame Padding="0" CornerRadius="10" HeightRequest="220">
                                                <AbsoluteLayout>
                                                    <Image Source="{Binding MoviePoster}" Aspect="AspectFill"
                                                           AbsoluteLayout.LayoutFlags="All"
                                                           AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>

                                                    <StackLayout  AbsoluteLayout.LayoutFlags="All"
                                                                  AbsoluteLayout.LayoutBounds="0,0,1,1" 															         Padding="10">

                                                        <Frame CornerRadius="50" HasShadow="True" 															               HeightRequest="15" WidthRequest="15"
                                                               BackgroundColor="white" Padding="10" Margin="0" 															  HorizontalOptions="EndAndExpand">
                                                            <Label Text="{Binding RatingStar,StringFormat='{0:F2}'}" 
                                                                   TextColor="black" FontSize="10" 											 							      FontAttributes="Bold"/>
                                                        </Frame>

                                                        <Frame BackgroundColor="White" CornerRadius="20" 																  Opacity="0.6" 
                                                               VerticalOptions="EndAndExpand" Padding="5">
                                                            <Label Text="{Binding Director}" 																				 HorizontalTextAlignment="Center"
                                                                   TextColor="#000000" FontSize="14" 																	      FontAttributes="Bold"/>
                                                        </Frame>

                                                    </StackLayout>
                                                </AbsoluteLayout>

                                                <Frame.GestureRecognizers>
                                                    <TapGestureRecognizer Tapped="MovieHot" CommandParameter="{Binding MovieID}"/>
                                                </Frame.GestureRecognizers>

                                            </Frame>

                                        </DataTemplate>
                                    </CollectionView.ItemTemplate>
                                </CollectionView>

                            </StackLayout>


                        </StackLayout>
                    </ScrollView>

                </tabView:SfTabItem.Content>
            </tabView:SfTabItem>

            <tabView:SfTabItem Title="Movie" ImageSource="movieIcon" SelectionColor="#000000" TitleFontColor="#a3a0a0">
                <tabView:SfTabItem.Content>
                    <StackLayout BackgroundColor="#ECECEC">

                        <StackLayout HorizontalOptions="FillAndExpand"
                                 HeightRequest="60"
                                 Padding="0,0,0,0" Margin="0,10,0,5">

                            <CollectionView ItemsLayout="HorizontalList"
                                        x:Name="PromotionList2"
                                        HeightRequest="250"
                                        HorizontalScrollBarVisibility="Never"
                                        VerticalOptions="Start">
                                <CollectionView.ItemTemplate>
                                    <DataTemplate>

                                        <StackLayout Padding="10">
                                            <Frame HasShadow="True"
                                                       BackgroundColor="{Binding Genre}"
                                                       Padding="25,10"
                                                       CornerRadius="100"
                                                       BorderColor="LightGray">
                                                <Label Text="{Binding Title}" FontAttributes="Bold"
                                                           TextColor="{Binding Duration}"/>
                                            </Frame>

                                            <StackLayout.GestureRecognizers>
                                                <TapGestureRecognizer CommandParameter="{Binding Title}" Tapped="Follow2"/>
                                            </StackLayout.GestureRecognizers>
                                        </StackLayout>


                                    </DataTemplate>
                                </CollectionView.ItemTemplate>

                            </CollectionView>


                        </StackLayout>


                        <ScrollView BackgroundColor="#ECECEC">
                            <StackLayout Padding="0,20,0,0"
                                         HorizontalOptions="FillAndExpand" VerticalOptions="FillAndExpand">

                                <StackLayout Margin="0">

                                    <CollectionView x:Name="MediaList2" Margin="10,0,10,0">
                                        <CollectionView.ItemsLayout>
                                            <GridItemsLayout Orientation="Vertical"
                                                         Span="1"
                                                         HorizontalItemSpacing="0"
                                                         VerticalItemSpacing="10"/>
                                        </CollectionView.ItemsLayout>
                                        <CollectionView.ItemTemplate>
                                            <DataTemplate>

                                                <StackLayout>
                                                    <StackLayout Orientation="Horizontal" Padding="0,10,0,10">
                                                        <AbsoluteLayout>
                                                            <Frame AbsoluteLayout.LayoutFlags="All" AbsoluteLayout.LayoutBounds="0,0,0.3,1" 
                                                               Padding="0" CornerRadius="0" HeightRequest="160" 
                                                               HorizontalOptions="StartAndExpand">
                                                                <AbsoluteLayout>
                                                                    <Image Source="{Binding MoviePoster}" Aspect="AspectFill"
                                                                       AbsoluteLayout.LayoutFlags="All"
                                                                       AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>
                                                                </AbsoluteLayout>
                                                            </Frame>

                                                            <StackLayout AbsoluteLayout.LayoutFlags="All"
                                                           AbsoluteLayout.LayoutBounds="1,0,0.7,1" Padding="10,2">

                                                                <StackLayout Orientation="Horizontal" Margin="0">

                                                                    <Label Text="{Binding Title}" TextColor="black" 
                                                                   FontSize="17" FontAttributes="Bold" VerticalTextAlignment="Center"/>

                                                                    <Frame CornerRadius="50" HasShadow="True" HeightRequest="12" WidthRequest="12"
                                                               BackgroundColor="white" Padding="8" Margin="0" HorizontalOptions="EndAndExpand">
                                                                        <Label Text="{Binding RatingStar,StringFormat='{0:F2}'}" 
                                                                   TextColor="black" FontSize="8" FontAttributes="Bold"/>
                                                                    </Frame>

                                                                </StackLayout>

                                                                <Label Text="{Binding Duration}" FontSize="14" TranslationY="-5"/>

                                                                <CollectionView ItemsSource="{Binding Genre}" HeightRequest="30">
                                                                    <CollectionView.ItemsLayout>
                                                                        <GridItemsLayout Orientation="Horizontal" Span="1" HorizontalItemSpacing="5"/>
                                                                    </CollectionView.ItemsLayout>
                                                                    <CollectionView.ItemTemplate>
                                                                        <DataTemplate>
                                                                            <StackLayout>
                                                                                <Frame BackgroundColor="White" CornerRadius="10" Padding="10,5">
                                                                                    <Label Text="{Binding}" FontSize="12"/>
                                                                                </Frame>
                                                                            </StackLayout>
                                                                        </DataTemplate>
                                                                    </CollectionView.ItemTemplate>
                                                                </CollectionView>



                                                                <Label Text="{Binding Director}"
                                                                   TextColor="Black" 
                                                                   FontSize="14" FontAttributes="Bold"/>

                                                                <Label Text="{Binding Description}" LineBreakMode="TailTruncation" MaxLines="2"/>

                                                            </StackLayout>
                                                        </AbsoluteLayout>

                                                        <StackLayout.GestureRecognizers>
                                                            <TapGestureRecognizer Tapped="MovieHot2" CommandParameter="{Binding MovieID}"/>
                                                        </StackLayout.GestureRecognizers>

                                                    </StackLayout>

                                                    <BoxView BackgroundColor="LightGray" HeightRequest="1" HorizontalOptions="FillAndExpand"/>

                                                </StackLayout>

                                            </DataTemplate>
                                        </CollectionView.ItemTemplate>
                                    </CollectionView>

                                </StackLayout>


                            </StackLayout>
                        </ScrollView>

                    </StackLayout>
                </tabView:SfTabItem.Content>
            </tabView:SfTabItem>

            <tabView:SfTabItem Title="Actor" ImageSource="actorIcon" SelectionColor="#000000" TitleFontColor="#a3a0a0">
                <tabView:SfTabItem.Content>
                    <ScrollView BackgroundColor="#ECECEC">
                        <StackLayout Padding="0,20,0,0"
                                         HorizontalOptions="FillAndExpand" VerticalOptions="FillAndExpand">

                            <StackLayout Margin="0" BindingContext="{StaticResource UserVM}">

                                <CollectionView ItemsSource="{Binding ActorAvatar}" Margin="10,0,10,0">
                                    <CollectionView.ItemsLayout>
                                        <GridItemsLayout Orientation="Vertical"
                                                         Span="4"
                                                         HorizontalItemSpacing="10"
                                                         VerticalItemSpacing="10"/>
                                    </CollectionView.ItemsLayout>
                                    <CollectionView.ItemTemplate>
                                        <DataTemplate>

                                            <StackLayout>
                                                <StackLayout Padding="0,10,0,10">

                                                    <Frame AbsoluteLayout.LayoutFlags="All" AbsoluteLayout.LayoutBounds="0,0,1,1" 
                                                               Padding="0" CornerRadius="100" HeightRequest="80"  WidthRequest="80"
                                                               HorizontalOptions="StartAndExpand">
                                                        <AbsoluteLayout>
                                                            <Image Source="{Binding ActorImage}" Aspect="AspectFill"
                                                                       AbsoluteLayout.LayoutFlags="All"
                                                                       AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>
                                                        </AbsoluteLayout>
                                                    </Frame>

                                                    <Label Text="{Binding ActorName}" HorizontalTextAlignment="Center" FontAttributes="Bold"/>



                                                </StackLayout>


                                                <StackLayout.GestureRecognizers>
                                                    <TapGestureRecognizer CommandParameter="{Binding ActorID}" Tapped="MoveActorMovie"/>
                                                </StackLayout.GestureRecognizers>

                                            </StackLayout>

                                        </DataTemplate>
                                    </CollectionView.ItemTemplate>
                                </CollectionView>

                            </StackLayout>


                        </StackLayout>
                    </ScrollView>

                </tabView:SfTabItem.Content>
            </tabView:SfTabItem>

            <tabView:SfTabItem Title="User" ImageSource="userIcon" SelectionColor="#000000" TitleFontColor="#a3a0a0">
                <tabView:SfTabItem.Content>
                    <StackLayout BackgroundColor="#ECECEC" BindingContext="{StaticResource UserVM}">

                        <Frame Padding="0" CornerRadius="0" HeightRequest="220">
                            <AbsoluteLayout>
                                <Image Source="background" Aspect="AspectFill"
                                                           AbsoluteLayout.LayoutFlags="All"
                                                           AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>

                                <StackLayout  AbsoluteLayout.LayoutFlags="All"
                                              AbsoluteLayout.LayoutBounds="0,0,1,1" Padding="10">

                                    <StackLayout VerticalOptions="CenterAndExpand" HorizontalOptions="CenterAndExpand">
                                        <abstractions:CircleImage Aspect="AspectFill"
                                                  WidthRequest="80"
                                                  HeightRequest="80"
                                                  HorizontalOptions="CenterAndExpand"
                                                  Source="{Binding UserAvatar}">

                                        </abstractions:CircleImage>

                                        <StackLayout HorizontalOptions="CenterAndExpand" Margin="0,10,0,0">
                                            <Label Text="{Binding UserFullname}" FontAttributes="Bold" TextColor="Black"
                                                   HorizontalTextAlignment="Center" FontSize="18"/>
                                            <Label Text="{Binding UserEmail}"
                                                   TextColor="Black" HorizontalTextAlignment="Center"/>
                                        </StackLayout>
                                    </StackLayout>

                                </StackLayout>
                            </AbsoluteLayout>

                        </Frame>

                        <StackLayout>

                            <Grid Margin="20,15,20,15" >
                                <Grid.RowDefinitions>
                                    <RowDefinition Height="*"/>
                                </Grid.RowDefinitions>
                                <Grid.ColumnDefinitions>
                                    <ColumnDefinition Width="*"/>
                                    <ColumnDefinition Width="*"/>
                                </Grid.ColumnDefinitions>


                                <StackLayout Grid.Row="0" Grid.Column="0"
                                                         VerticalOptions="CenterAndExpand">
                                    <Label Text="Issue Tickets" FontSize="14"
                                                       VerticalTextAlignment="Center"
                                                       TextColor="#404040">

                                    </Label>
                                </StackLayout>

                                <StackLayout Grid.Row="0" Grid.Column="1" HorizontalOptions="EndAndExpand">
                                    <Image Source="iconsarrowright"
                                                       Aspect="AspectFill"
                                                       HorizontalOptions="CenterAndExpand"
                                                       VerticalOptions="CenterAndExpand"
                                                       WidthRequest="20"></Image>
                                </StackLayout>

                                <Grid.GestureRecognizers>
                                    <TapGestureRecognizer Tapped="Ticket"/>
                                </Grid.GestureRecognizers>

                            </Grid>

                            <BoxView Margin="10,0,10,0" BackgroundColor="LightGray" HeightRequest="1" HorizontalOptions="FillAndExpand"/>

                            <Grid Margin="20,15,20,15">
                                <Grid.RowDefinitions>
                                    <RowDefinition Height="*"/>
                                </Grid.RowDefinitions>
                                <Grid.ColumnDefinitions>
                                    <ColumnDefinition Width="*"/>
                                    <ColumnDefinition Width="*"/>
                                </Grid.ColumnDefinitions>


                                <StackLayout Grid.Row="0" Grid.Column="0"
                                                         VerticalOptions="CenterAndExpand">
                                    <Label Text="Sign Out" FontSize="14"
                                                       VerticalTextAlignment="Center"
                                                       TextColor="#404040"></Label>
                                </StackLayout>

                                <StackLayout Grid.Row="0" Grid.Column="1" HorizontalOptions="EndAndExpand">
                                    <Image Source="iconsarrowright"
                                                       Aspect="AspectFill"
                                                       HorizontalOptions="CenterAndExpand"
                                                       VerticalOptions="CenterAndExpand"
                                                       WidthRequest="20"></Image>
                                </StackLayout>

                                <Grid.GestureRecognizers>
                                    <TapGestureRecognizer Tapped="Signout"/>
                                </Grid.GestureRecognizers>

                            </Grid>

                        </StackLayout>

                    </StackLayout>
                </tabView:SfTabItem.Content>
            </tabView:SfTabItem>

        </tabView:SfTabView>

    </ContentPage.Content>
</ContentPage>
```

#### **Back End**

首页的 Controller

```c#
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Cinema.API;
using Cinema.Models;
using Cinema.PopupPage;
using Cinema.ViewModel;
using OneSignalSDK.Xamarin;
using Rg.Plugins.Popup.Services;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Cinema.View
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class HomePage : ContentPage
	{
        // 引入 VM
		public static UserVM us = new UserVM();

		public HomePage()
		{
			InitializeComponent();
		}

        // 通常用于初始化数据或更新 UI
        // OnAppearing 方法在页面即将显示时被调用
		protected override void OnAppearing()
		{
			base.OnAppearing();

			UserDB userdbdata = new UserDB();
            
            // Api
			var one_user = userdbdata.GetAllUser_One();
            
			if (one_user.OneSignalOpen == true)
			{
                // 更换 Icon
				notificationimg.Source = "NotificationIcon";
			}
			else
			{
                // 更换 Icon
				notificationimg.Source = "NoNotificationIcon";
			}

            // 固定 List
			List<Movie> MovieListData = new List<Movie>()
			{
				new Movie(){Title = "Action",Genre = "#cf1d46",Duration="#ffffff"},
				new Movie(){Title = "Horror",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Love",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Thriller",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Comedy",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Sci-Fi",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "War",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Crime",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Adventure",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Disaster",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Drama",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Classic",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Homosexual",Genre = "#f0eded",Duration="#9e9e9e"},
			};
			
            // 调用 List
			PromotionList.ItemsSource = MovieListData;

            // 调用 VM public static 方法 获取 数据
			MediaList.ItemsSource = UserVM.MovieList.Where(x => x.Genre.Contains("Action")).Take(6).ToList();
			int count = UserVM.MovieList.Where(x => x.Genre.Contains("Action")).Take(6).ToList().Count;
			MediaList_SizeChanged(count);

            // 调用 VM public static 方法 获取 数据
			var allMovie = UserVM.MovieList.Where(x => x.Genre.Contains("Action")).ToList();

            // 创建 空 List
			List<string[]> list_inter = new List<string[]>();

            // 将 数据 保存 在 List
			foreach (var i in allMovie)
			{
				string[] str = i.Genre.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries);
				list_inter.Add(str);
			}

			int num_inter = 0;

            // 使用 LINQ 方法
			var db = (from c in allMovie
					  select new
					  {
						  MovieID = c.MovieID,
						  list_inter = list_inter,
						  Genre = list_inter[num_inter++],
						  Title = c.Title,
						  Duration = c.Duration,
						  MovieTrailerLink = c.MovieTrailerLink,
						  MoviePoster = c.MoviePoster,
						  RatingStar = c.RatingStar,
						  Description = c.Description,
						  Director = c.Director,
					  }).ToList();

            // 赋予 前端 数据
			PromotionList2.ItemsSource = MovieListData;
            // 赋予 前端 数据
			MediaList2.ItemsSource = db;
		}

		private void MediaList_SizeChanged(int numberOfItems)
		{
			double collectionViewWidth = MediaList.Width;

			double itemWidth = (collectionViewWidth - (2 * 6)) / 2;

			double rows = Math.Ceiling((double)numberOfItems / 2);
			double collectionViewHeight = (itemWidth * rows) + (rows - 1) * 22;

			double additionalHeight = 50;
			collectionViewHeight += additionalHeight;

			MediaList.HeightRequest = collectionViewHeight;
		}

		private async void Follow(object sender, EventArgs e)
		{
			await ((StackLayout)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((StackLayout)sender).ScaleTo(1, 10, Easing.Linear);

			var Element = sender as StackLayout;
			var value = Element.GestureRecognizers[0] as TapGestureRecognizer;

			var data = value.CommandParameter.ToString();

			List<Movie> moviedataGrene = new List<Movie>()
			{
				new Movie(){Title = "Action",Genre = "#cf1d46",Duration="#ffffff"},
				new Movie(){Title = "Horror",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Love",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Thriller",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Comedy",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Sci-Fi",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "War",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Crime",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Adventure",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Disaster",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Drama",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Classic",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Homosexual",Genre = "#f0eded",Duration="#9e9e9e"},
			};

			List<Movie> NewmoviedataGrene = new List<Movie>();

			foreach (var i in moviedataGrene)
			{
				if (data == i.Title)
				{
					i.Duration = "#ffffff";
					i.Genre = "#cf1d46";
				}
				else
				{
					i.Duration = "#9e9e9e";
					i.Genre = "#f0eded";
				}
				NewmoviedataGrene.Add(i);
			}

			PromotionList.ItemsSource = NewmoviedataGrene;

			MediaList.ItemsSource = UserVM.MovieList.Where(x => x.Genre.Contains(data)).Take(6).ToList();
			int count = UserVM.MovieList.Where(x => x.Genre.Contains(data)).Take(6).ToList().Count;
			MediaList_SizeChanged(count);
		}

		private async void OpenTenu(object sender, EventArgs e)
		{
			await ((Frame)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((Frame)sender).ScaleTo(1, 10, Easing.Linear);

			PopupNavigation.PushAsync(new OpenTenuPopup());
		}

		private async void NotificationOpen(object sender, EventArgs e)
		{
			await ((Frame)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((Frame)sender).ScaleTo(1, 10, Easing.Linear);

			UserDB userdata_check = new UserDB();
			var usernotification = userdata_check.GetAllUser_One();
			if (usernotification.OneSignalOpen == true)
			{
				usernotification.OneSignalOpen = false;
			}
			else
			{
				usernotification.OneSignalOpen = true;
			}
			await userdata_check.EditUser(usernotification);

			if (usernotification.OneSignalOpen == true)
			{
				notificationimg.Source = "NotificationIcon";
			}
			else
			{
				notificationimg.Source = "NoNotificationIcon";
			}
		}

		private async void Follow2(object sender, EventArgs e)
		{
			await ((StackLayout)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((StackLayout)sender).ScaleTo(1, 10, Easing.Linear);

			var Element = sender as StackLayout;
			var value = Element.GestureRecognizers[0] as TapGestureRecognizer;

			var data = value.CommandParameter.ToString();

			List<Movie> moviedataGrene = new List<Movie>()
			{
				new Movie(){Title = "Action",Genre = "#cf1d46",Duration="#ffffff"},
				new Movie(){Title = "Horror",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Love",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Thriller",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Comedy",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Sci-Fi",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "War",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Crime",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Adventure",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Disaster",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Drama",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Classic",Genre = "#f0eded",Duration="#9e9e9e"},
				new Movie(){Title = "Homosexual",Genre = "#f0eded",Duration="#9e9e9e"},
			};

			List<Movie> NewmoviedataGrene = new List<Movie>();

			foreach (var i in moviedataGrene)
			{
				if (data == i.Title)
				{
					i.Duration = "#ffffff";
					i.Genre = "#cf1d46";
				}
				else
				{
					i.Duration = "#9e9e9e";
					i.Genre = "#f0eded";
				}
				NewmoviedataGrene.Add(i);
			}

			var allMovie = UserVM.MovieList.Where(x => x.Genre.Contains(data)).ToList();

			List<string[]> list_inter = new List<string[]>();

			foreach (var i in allMovie)
			{
				string[] str = i.Genre.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries);
				list_inter.Add(str);
			}

			int num_inter = 0;

			var db = (from c in allMovie
					  where c.Genre.Contains(data)
					  select new
					  {
						  MovieID = c.MovieID,
						  list_inter = list_inter,
						  Genre = list_inter[num_inter++],
						  Title = c.Title,
						  Duration = c.Duration,
						  MovieTrailerLink = c.MovieTrailerLink,
						  MoviePoster = c.MoviePoster,
						  RatingStar = c.RatingStar,
						  Description = c.Description,
						  Director = c.Director,
					  }).ToList();

			PromotionList2.ItemsSource = NewmoviedataGrene;
			MediaList2.ItemsSource = db;
		}

		private async void MovieHot(object sender, EventArgs e)
		{
			await ((Frame)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((Frame)sender).ScaleTo(1, 10, Easing.Linear);

			var Element = sender as Frame;
			var value = Element.GestureRecognizers[0] as TapGestureRecognizer;

			var data = value.CommandParameter.ToString();

			Navigation.PushAsync(new MovieDetailPage(Convert.ToInt32(data)));
		}

		private async void MovieHot2(object sender, EventArgs e)
		{
			await ((StackLayout)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((StackLayout)sender).ScaleTo(1, 10, Easing.Linear);

			var Element = sender as StackLayout;
			var value = Element.GestureRecognizers[0] as TapGestureRecognizer;

			var data = value.CommandParameter.ToString();

			Navigation.PushAsync(new MovieDetailPage(Convert.ToInt32(data)));
		}

		private async void Ticket(object sender, EventArgs e)
		{
			await ((Grid)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((Grid)sender).ScaleTo(1, 10, Easing.Linear);

			Navigation.PushAsync(new TransferPage());
		}

		private async void Signout(object sender, EventArgs e)
		{
			await ((Grid)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((Grid)sender).ScaleTo(1, 10, Easing.Linear);

			Preferences.Set("Username", "");
			Preferences.Set("Password", "");
			UserDB.userID = 0;

			Navigation.PopToRootAsync();
		}

		private async void MoveActorMovie(object sender, EventArgs e)
		{
			await ((StackLayout)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((StackLayout)sender).ScaleTo(1, 10, Easing.Linear);

			var Element = sender as StackLayout;
			var value = Element.GestureRecognizers[0] as TapGestureRecognizer;

			var data = value.CommandParameter.ToString();

			ActorDB ac = new ActorDB();
			var dataall = ac.GetAllActor_User();
			var dataFirst = dataall.Where(x => x.ActorID == Convert.ToInt32(data)).FirstOrDefault();
			Navigation.PushAsync(new ActorMoviePage(dataFirst));
		}

		private async void MoveSearch(object sender, EventArgs e)
		{
			await ((Image)sender).ScaleTo(0.9, 30, Easing.Linear);
			await Task.Delay(10);
			await ((Image)sender).ScaleTo(1, 30, Easing.Linear);

			if (Search.Text == "")
			{
				SearchName.ErrorColor = Color.Red;
				SearchName.ErrorText = "This Movie has not been found";
				SearchName.HasError = true;
			}
			else
			{
				MovieDB moviedb = new MovieDB();
				var movie = moviedb.GetAllMovie();
				var datafind = movie.Where(x => x.Title.Contains(Search.Text)).FirstOrDefault();
				if (datafind != null)
				{
					Navigation.PushAsync(new MovieDetailPage(datafind.MovieID));
				}
				else
				{
					SearchName.ErrorColor = Color.Red;
					SearchName.ErrorText = "This song has not been found";
					SearchName.HasError = true;
				}
			}
		}

		private void Handle_Completed(object sender, EventArgs e)
		{
			if (Search.Text == "")
			{
				SearchName.ErrorColor = Color.Red;
				SearchName.ErrorText = "This Movie has not been found";
				SearchName.HasError = true;
			}
			else
			{
				MovieDB moviedb = new MovieDB();
				var movie = moviedb.GetAllMovie();
				var datafind = movie.Where(x => x.Title.Contains(Search.Text)).FirstOrDefault();
				if (datafind != null)
				{
					Navigation.PushAsync(new MovieDetailPage(datafind.MovieID));
				}
				else
				{
					SearchName.ErrorColor = Color.Red;
					SearchName.ErrorText = "This song has not been found";
					SearchName.HasError = true;
				}
			}
		}

		private void OnAutoCompleteItemSelected(object sender, Syncfusion.SfAutoComplete.XForms.SelectionChangedEventArgs e)
		{
			if (Search.Text != "")
			{
				MovieDB moviedb = new MovieDB();
				var movie = moviedb.GetAllMovie();
				var datafind = movie.Where(x => x.Title.Contains(Search.Text)).FirstOrDefault();
				if (datafind != null)
				{
					SearchName.ErrorText = "";
					SearchName.HasError = false;
					Navigation.PushAsync(new MovieDetailPage(datafind.MovieID));
				}
				else
				{
					SearchName.ErrorColor = Color.Red;
					SearchName.ErrorText = "This song has not been found";
					SearchName.HasError = true;
				}
			}
		}
	}
}
```
