---
id: xamarin-mvvm
slug: /xamarin-mvvm
title: Xamarin MVVM
date: 2024-11-04
authors: Hoo
tags: [xamarin]
keywords: [xamarin]
---

## MVVM 用法

### 配置

当属性值发生变化时需要更新

```c#
public class UserVM : INotifyPropertyChanged
{
	protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
	{
		PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
	}
	public event PropertyChangedEventHandler PropertyChanged;
    
    // 其他 MVVM 的 Function
}
```



### 我的项目 例子：

`UserVM` 例子

```c#
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Cinema.API;
using Cinema.Models;
using Cinema.View;
using Xamarin.Essentials;

namespace Cinema.ViewModel
{
	public class UserVM : INotifyPropertyChanged
	{
        // 配置
		protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

        // 配置
		public event PropertyChangedEventHandler PropertyChanged;

        // 连接 API
		public static MovieDB Moviedb = new MovieDB();
        // 获取 API 数据
		public static ObservableCollection<Movie> MovieList { get; set; } = Moviedb.GetAllMovie();

        // 获取 API 数据
		public List<Movie> HotMovie { get; set; } = MovieList.OrderByDescending(x => x.RatingStar).Take(3).ToList();
        // 获取 API 数据
		public List<string> SearName { get; set; } = MovieList.Select(x => x.Title).ToList();

        // 连接 API
		public static ActorDB Actordb = new ActorDB();
        // 获取 API 数据
		public static ObservableCollection<Actor> ActorList { get; set; } = Actordb.GetAllActor_User();
        // 获取 API 数据
		public List<Actor> ActorAvatar { get; set; } = ActorList.ToList();

        // 连接 API
		public static UserDB userDB = new UserDB();
        // 获取 API 数据
		public static User userDB_Data = userDB.GetAllUser_One();

        // 定义 MVVM 格式
		public string UserFullname { get; set; } = userDB_Data.FullName;
		public string UserAvatar { get; set; } = userDB_Data.Avatar;
		public string UserEmail { get; set; } = userDB_Data.Email;

		public static User getUserdata()
		{
			string Username = Preferences.Get("Username", string.Empty);
			string Password = Preferences.Get("Password", string.Empty);
			var userData = userDB.GetAllUser();
			var data = userData.Where(x => x.Username == Username & x.Password == Password).FirstOrDefault();
			if (data != null)
			{
				return data;
			}
			return null;
		}

	}
}
```



`LoginVM` 例子

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Cinema.API;
using Cinema.View;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace Cinema.ViewModel
{
	public class LoginVM : INotifyPropertyChanged
	{
        // 配置
		protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

        // 配置
		public event PropertyChangedEventHandler PropertyChanged;

        // 连接 API
		public UserDB userDB = new UserDB();

        // 定义
		public string username { get; set; }
		public string Username
		{
			get { return username; }
			set
			{
				if (username != value)
				{
					username = value;
					NotifyPropertyChanged();
				}
			}
		}

        // 定义
		public string password { get; set; }
		public string Password
		{
			get { return password; }
			set
			{
				if (password != value)
				{
					password = value;
					NotifyPropertyChanged();
				}
			}
		}

        // 定义 MVVM function
		public Command LoginFunction { get; set; }

        // 配置 MVVM function
		public LoginVM()
		{
			LoginFunction = new Command(async async => await CheckLogin());
		}

        // 异步实现 MVVM function
		async Task CheckLogin()
		{
			UserDB userDB2 = new UserDB();
			var userData = userDB2.GetAllUser();
			var data = userData.Where(x => x.Username == this.Username & x.Password == this.Password).FirstOrDefault();
			if (data != null)
			{
				Preferences.Set("Username", this.Username);
				Preferences.Set("Password", this.Password);
				UserDB.userID = data.UserID;

                // 返回 首页 、登入成功
				await Application.Current.MainPage.Navigation.PushAsync(new HomePage());
			}
		}

		public bool CheckLogin_New(string us, string pass)
		{
			UserDB userDB2 = new UserDB();
			var userData = userDB2.GetAllUser();
			var data = userData.Where(x => x.Username == us & x.Password == pass).FirstOrDefault();
			if (data != null)
			{
				Preferences.Set("Username", us);
				Preferences.Set("Password", pass);
				UserDB.userID = data.UserID;
				return true;
			}
			return false;
		}

	}

}
```



## 学习

### **配置 前端 使用**

```
// 配置 MVVM 在 View
xmlns:vm="clr-namespace:Cinema.ViewModel"
```

```xml
// 连接你的 MVVM 文件， 以下更换你的文件名称
<ContentPage.Resources>
        <ResourceDictionary>
            <vm:UserVM x:Key="UserVM"/>
            <vm:FunctionVM x:Key="FunctionVM"/>
        </ResourceDictionary>
</ContentPage.Resources>
```

### **定义**

BindingContext

```xml
<ScrollView BackgroundColor="#ECECEC">
     <StackLayout Padding="0,20,0,0"
                  HorizontalOptions="FillAndExpand" VerticalOptions="FillAndExpand" 
                  BindingContext="{StaticResource UserVM}">
    	// 其他内容都可以使用到 UserVM 里面的所有 Function
     </StackLayout>      
<</ScrollView>      
```

### **头像**

```xml
<abstractions:CircleImage Aspect="AspectFit"
                          WidthRequest="50"
                          HeightRequest="50"
                          HorizontalOptions="EndAndExpand"
                          Source="{Binding UserAvatar}"
                          Grid.Row="0"
                          Grid.Column="0" Grid.RowSpan="2"
                          Margin="0,0,10,0">
</abstractions:CircleImage>
```

### **文本**

```xml
<Label Text="{Binding UserFullname}" FontAttributes="Bold"
       Grid.Row="0" Grid.Column="1" TextColor="Black" FontSize="15"/>
```

### **多数据 [0]**

```xml
<Image Source="{Binding HotMovie[0].MoviePoster}" Aspect="AspectFill"
                                       AbsoluteLayout.LayoutFlags="All"
                                       AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>
```

### **B 方式**

在 View 后端 Controller 配置 VM 文件，但是只能配置一个 VM 而已，不推荐使用

```c#
public ForgetPasswordPopup()
{
	InitializeComponent();
    // 全局 赋予
    // 只能用一个 VM
	BindingContext = vm;
}
```

```xml
<Entry TextColor="Black" Text="{Binding Email}"/>
```



