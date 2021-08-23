<template>
  <div>
    <van-row>
      <van-col span="16">
        <div class="title"><span>填写会员信息</span></div></van-col
      >
      <van-col span="4" offset="3">
        <van-button round block type="default" to="/user"
          >返回</van-button
        ></van-col
      >
    </van-row>
    <van-form @submit="onSubmit">
      <!-- 姓名 -->
      <van-field
        v-model="username"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        maxlength="7"
        :rules="[{ pattern: checkUsername, message: '请填写正确的姓名' }]"
      />

      <!-- 手机号 -->
      <van-field
        v-model="mobile"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ pattern: checkMobile, message: '请填写正确的手机号' }]"
      />

      <!-- 性别 -->
      <van-field name="性别" label="性别">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="男性">男</van-radio>
            <van-radio name="女性">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 所在专业选择器 -->
      <van-field
        readonly
        clickable
        is-link
        name="picker"
        :value="major"
        label="专业"
        placeholder="所在专业"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请填写所在专业' }]"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="confirmMajor"
          @cancel="showPicker = false"
        />
      </van-popup>

      <!-- 出生日 -->
      <van-field
        readonly
        clickable
        is-link
        name="calendar"
        :value="birth"
        label="出生日期"
        placeholder="出生日期"
        @click="showCalendar = true"
        :rules="[{ required: true, message: '请填写出生日期' }]"
      />
      <van-calendar
        v-model="showCalendar"
        @confirm="confirmBirth"
        :min-date="minDate"
        :max-date="maxDate"
        :default-date="defaultDate"
      />

      <!-- 确认按钮 -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户名
      username: "",
      checkUsername: /^[\u2E80-\u9FFF]+$/,
      // 手机号
      mobile: "",
      checkMobile: /^1[3|4|5|7|8][0-9]{9}$/,
      // 性别
      radio: "",
      // 专业院校数据
      major: "",
      columns: [
        {
          text: "美兰校区",
          children: [
            {
              text: "机电工程学院",
              children: [
                // 本科
                { text: "机械设计制造及自动化" },
                { text: "汽车服务工程技术" },
                { text: "新能源汽车工程技术" },
                // 专科
                { text: "机械设计制造与制造" },
                { text: "机电一体化技术" },
                { text: "电气自动化技术" },
                { text: "智能控制技术" },
                { text: "汽车制造与试验技术" },
                { text: "新能源汽车技术" },
                { text: "新能源汽车技术(高职本科3+2)" },
              ],
            },
            {
              text: "信息工程学院",
              children: [
                // 本科
                { text: "物联网工程技术" },
                { text: "软件工程技术" },
                { text: "大数据工程技术" },
                // 专科
                { text: "计算机网络技术" },
                { text: "软件技术" },
                { text: "电子商务" },
                { text: "大数据技术" },
                { text: "网络新闻与传播(新媒体方向)" },
              ],
            },
            {
              text: "化学与材料工程学院",
              children: [
                // 本科
                { text: "应用化工技术" },
                // 专科
                { text: "石油化工技术" },
                { text: "食品检验检测技术" },
                { text: "药品生产技术" },
              ],
            },
            {
              text: "海事学院",
              children: [
                // 本科
                { text: "水路运输与海事管理" },
                { text: "航海技术" },
                // 专科
                { text: "航海技术" },
                { text: "国际邮轮乘务管理" },
                { text: "轮机工程技术" },
                { text: "水路运输安全管理" },
                { text: "安全技术与管理" },
                { text: "空中乘务" },
              ],
            },
            {
              text: "财经学院",
              children: [
                // 本科
                { text: "金融管理" },
                // 专科
                { text: "工商企业管理" },
                { text: "市场营销" },
                { text: "现代物流管理" },
                { text: "旅游管理" },
                { text: "酒店管理与数字化运营" },
                { text: "烹饪工艺与营养" },
                { text: "金融服务与管理" },
                { text: "人力资源管理" },
              ],
            },
            {
              text: "设计学院",
              children: [
                // 本科
                { text: "视觉传达设计" },
                { text: "环境艺术设计" },
                // 专科
                { text: "艺术设计" },
                { text: "环境艺术设计" },
                { text: "传播与策划" },
                { text: "风景园林设计" },
                { text: "网络新闻与传播(文化传播与设计方向)" },
              ],
            },
          ],
        },
        {
          text: "云龙校区",
          children: [
            {
              text: "城建学院",
              children: [
                // 本科
                { text: "建筑工程" },
                { text: "工程造价" },
                // 专科
                { text: "建筑设计" },
                { text: "建筑装饰工程技术" },
                { text: "建筑工程技术" },
                { text: "工程造价" },
                { text: "市政工程造价" },
              ],
            },
            {
              text: "国际护理学院",
              children: [
                // 本科
                { text: "护理" },
                // 专科
                { text: "护理" },
                { text: "护理(口腔护理方向)" },
                { text: "助产" },
              ],
            },
            {
              text: "临床医药学院",
              children: [
                // 专科
                { text: "中药学" },
                { text: "口腔医学技术" },
                { text: "医学检验技术" },
              ],
            },
            {
              text: "健康科学学院",
              children: [
                // 本科
                { text: "健康管理" },
                // 专科
                { text: "健康管理" },
                { text: "社区康复" },
              ],
            },
            {
              text: "传媒与音乐学院",
              children: [
                // 专科
                { text: "音乐表演" },
                { text: "舞蹈表演" },
              ],
            },
            {
              text: "会计学院",
              children: [
                // 本科
                { text: "大数据与财务管理" },
                // 专科
                { text: "大数据与会计" },
                { text: "大数据与财务管理" },
              ],
            },
            {
              text: "传媒与音乐学院",
            },
          ],
        },
      ],
      showPicker: false,
      // 出生日期
      birth: "",
      minDate: new Date(1995, 0, 1),
      maxDate: new Date(2035, 0, 31),
      defaultDate: new Date(2000, 0, 1),
      showCalendar: false,
    };
  },
  methods: {
    // 提交表单
    onSubmit(values) {
      console.log("submit", values);
    },
    // 确定专业
    confirmMajor(major) {
      this.major = major.toString();
      this.showPicker = false;
    },
    // 确定出生日
    confirmBirth(date) {
      this.birth = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      this.showCalendar = false;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 5vw;
}

.van-button {
  margin: 2vh 0;
}
</style>