import {getImageUrl} from "assets/js/getImage";
import {date} from "quasar";

export function PostModel(post, withSpecificInfo = true) {
    let humanResource = post.refHumanResource
    let company = post.refHumanResource.refCompany
    return {
        id: post.id,
        name: post.name,
        salaryBottom: JSON.parse(post.salaryRange)[0],
        salaryTop: JSON.parse(post.salaryRange)[1],
        month: JSON.parse(post.salaryRange)[2],
        salaryShown: JSON.parse(post.salaryRange)[0] === JSON.parse(post.salaryRange)[1] ?
            `${JSON.parse(post.salaryRange)[0]} · ${JSON.parse(post.salaryRange)[2]}薪` :
            `${JSON.parse(post.salaryRange)[0]}~${JSON.parse(post.salaryRange)[1]} · ${JSON.parse(post.salaryRange)[2]}薪`,
        startTime: JSON.parse(post.workingRange)[0],
        endTime: JSON.parse(post.workingRange)[1],
        timeShown: `${JSON.parse(post.workingRange)[0]}~${JSON.parse(post.workingRange)[1]}`,
        resting: post.resting,
        imageUrl: getImageUrl(post.imageUrl),
        desc: post.desc,
        location: company.location,
        releaseTime: date.formatDate(post.createTime,'YYYY年MM月DD日 hh:mm'),
        isLiked: false,
        postType: {
            id: post.refPostType.id,
            name: post.refPostType.name
        },
        humanResource: withSpecificInfo ? {
            id: humanResource.id,
            name: humanResource.name,
            email: humanResource.email,
            postName: humanResource.postName,
            avatarUrl: getImageUrl(humanResource.avatarUrl),
            introduction: humanResource.introduction,
        } : null,
        company: withSpecificInfo ? {
            id: company.id,
            name: company.name,
            location: company.location,
            logoUrl: getImageUrl(company.logoUrl),
            headCount: company.headCount,
            introduction: company.introduction,
            companyType: {
                id: company.refCompanyType.id,
                name: company.refCompanyType.name
            }
        } : null,
    }
}
